import argparse
import pydicom
import datetime
import json
import os
import pypx
import shutil
import subprocess
import uuid

import pudb


parser = argparse.ArgumentParser(description='Generate JPG Strips from DICOM directories')

parser.add_argument('-d', dest="directory")
parser.add_argument('-c', dest="category")
parser.add_argument('-p', dest="prefix")
parser.add_argument('--study', dest='study', action='store_true')
parser.set_defaults(study=False, prefix='PATIENT')

args = parser.parse_args()


# python3 dcmpreview.py -s=/neuro/labs/grantlab/research/GE/RSNA/patients/PATIENT1^6^MONTHS -c=patient -p=PATIENT1^6^MONTHS

directory = args.directory
directoryType = 'study' if args.study == True else 'series'
category = args.category
normative = True if category == 'normative' else False
prefix = args.prefix

def processDicomField(dcm_info, field):
    value = "no value provided"
    if field in dcm_info:
        value = pypx.utils.sanitize(dcm_info.data_element(field).value)
    return value

def generateJPG(src, dest):
    executable = '/usr/bin/dcmj2pnm' # '/usr/local/bin/dcmj2pnm'
    command = executable + ' +oj +Wh 15 +Fa ' + src + ' ' + dest
    response = subprocess.run(
        command, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, shell=True)

def resizeJPG(dest):
    executable = '/usr/bin/mogrify' # '/opt/ImageMagick/bin/mogrify'
    options = '-resize 96x96 -background none -gravity center -extent 96x96'
    source = os.path.join(dest, '*')
    command = executable + ' ' + options + ' ' + source
    response = subprocess.run(
        command, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, shell=True)

def previewJPG(src, dest):
    # create preview
    executable = '/usr/bin/convert' # '/opt/ImageMagick/bin/convert'
    options = '-append'
    output = os.path.join(dest, 'preview.jpg')
    command = executable + ' ' + options + ' ' + src + '/* ' + output
    response = subprocess.run(
        command, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, shell=True)

def anonymize(src, uuid):
    patient_name = prefix # PATIENT^7^MONTHS | NORMATIVE^7MONTHS
    patient_id = prefix + '^ID' # PATIENT^7^MONTHS^ID | NORMATIVE^7^MONTHS^ID
    series_uid = uuid
    study_uid = 'ANONYMIZED'
    study_id = 'ANONYMIZED'
    sop_uid = 'ANONYMIZED'
    accession_number = 'ANONYMIZED'
    refering_physician = 'ANONYMIZED'
    other_patient_ids = 'ANONYMIZED'
    operators_name = 'ANONYMIZED'
    image_comments = 'ANONYMIZED'
    institution_name = 'ANONYMIZED'
    institution_address = 'ANONYMIZED'
    physicians_of_record = 'ANONYMIZED'

    # create preview / Be aware that some paramerters may not be present in the dcm file
    executable = '/usr/bin/dcmodify' # '/usr/local/bin/dcmodify'
    options = '-ie -gin -nb \
      -ma "(0010,0010)=' + patient_name + '" -ma "(0010,0020)=' + patient_id + '" \
      -ma "(0020,000E)=' + series_uid + '" -ma "(0020,000D)=' + study_uid + '" \
      -ma "(0008,0050)=' + accession_number + '" -ma "(0008,0090)=' + refering_physician + '" -ma "(0008,1070)=' + operators_name + '" \
      -ma "(0008,1155)=' + sop_uid + '" -ma "(0010,1000)=' + other_patient_ids + '" -ma "(0020,0010)=' + study_id + '" \
      -ma "(0020,4000)=' + image_comments + '" \
      -ma "(0008,0080)=' + institution_name + '" -ma "(0008,0081)=' + institution_address + '" -ma "(0008,1048)=' + physicians_of_record + '"'

    # update series description for normative data (make it shorter)
    if normative:
        options += ' -ma "(0008,1030)=Normative Patient"'

    output = os.path.join(src, '*')
    command = executable + ' ' + options + ' ' + output
    response = subprocess.run(
        command, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, shell=True)

def jsonize(file, location, files, sp):
    
    data = pydicom.read_file(file)
    # parse file to extract relevant information
    uid = processDicomField(data, 'SeriesInstanceUID')
    description = processDicomField(data, 'SeriesDescription')
    study_description = processDicomField(data, 'StudyDescription')
    date = processDicomField(data, 'SeriesDate')
    patient_id =  processDicomField(data, 'PatientID')
    patient_name =  processDicomField(data, 'PatientName')
    mods =  processDicomField(data, 'ModalitiesInStudy')
    json_obj = {
        "query": {
            "data": [
                {
                    "SeriesInstanceUID": {
                        "value": uid,
                    },
                    "uid": {
                        "value": uid,
                    },
                    "SeriesDescription": {
                        "value": description,
                    },
                    "StudyDescription": {
                        "value": study_description,
                    },
                    "ModalitiesInStudy": {
                        "value": mods,
                    },
                    "PatientID": {
                        "value": patient_id,
                    },
                    "PatientName": {
                        "value": patient_name,
                    },
                    #  extra fun
                    "details": {
                        "series": {
                           "uid": uid,
                           "description": description,
                           "date": date,
                           "data": files,
                           "files": str(len(files)),
                           "preview": {
                               "blob": '',
                               "url": sp + "/preview.jpg",
                           },
                        },
                   },
                }
            ],

        },
    }

    with open(location + '/demo.json', 'w') as outfile:
        json.dump(json_obj, outfile)

def processSeries(tar):
    # generate jpgs for all dcm files
    print("TAR="+tar)
    sorted_images = sorted(os.listdir(tar))
    target_path = tar
    target_path_jpgs = ''
    basedir = os.path.basename(os.path.dirname(os.path.dirname(tar)))
    studir = os.path.basename(os.path.dirname(tar))
    serdir = os.path.basename(tar)
    series_prefix = basedir + '/' + studir + '/' + serdir + '/'
    files = []
    source = ''
    print('--- FILES')
    #pudb.set_trace()
    for filename in sorted_images:
        name, extension = os.path.splitext(filename)

        # discard files that start with '.'
        if name.startswith('.') == True:
            continue

        # discard files that do not end with '.dcm' or ''
        if not ((extension == '.dcm') or (extension == '')):
            continue

        basename = os.path.basename(filename)
        tmp_source = os.path.join(tar, basename)

        isDir = os.path.isdir(tmp_source)

        # discard directories in the series directory
        if isDir == True:
            continue

        source = tmp_source
        print(source)
        files += [series_prefix + filename]

        # create target jpg directory
        target_path_jpgs = os.path.join(target_path, 'jpgs')
        if not os.path.exists(target_path_jpgs):
            os.makedirs(target_path_jpgs)
        target_jpg = os.path.join(target_path_jpgs, filename + '.jpg')
        generateJPG(source, target_jpg)

    # generate preview for the series
    resizeJPG(target_path_jpgs)
    previewJPG(target_path_jpgs, target_path)
    
    # anonymize
    series_uuid = str(uuid.uuid1())
    anonymize(tar, series_uuid)

    # generate JSON
    jsonize(source, target_path, files, series_prefix)

def processStudy(studyLocation):
    # generate jpgs for all dcm files
    sorted_series = sorted(os.listdir(studyLocation))
    for series in sorted_series:
        source_series = os.path.join(studyLocation, series)
        print()
        print('--- SERIES')
        print(source_series)
        processSeries(source_series)
#
# START SCRIPT
#

if directoryType == 'study':
    print('--- STUDY')
    print(directory)
    processStudy(directory)
else:
    print('--- SERIES')
    print(directory)
    processSeries(directory)

exit()
