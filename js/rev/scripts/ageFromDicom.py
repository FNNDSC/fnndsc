import argparse
import dicom
import datetime
import json
import os
import pypx
import shutil
import subprocess

parser = argparse.ArgumentParser(description='Generate DICOM Strips from DICOM directories')

parser.add_argument('-t', dest="target")
parser.add_argument('-d', action="store", dest="destination")

args = parser.parse_args()

target = args.target
destination = args.destination
patient_list = [
    {
        'mrn': '4631969-8357',
        'scanner_strength': '3',
        'age': '21_days',
        'series': [
            {
                'modality': 'Sagittal_T1',
                'series_number': '5'
            },
            {
                'modality': 'Axial_T2',
                'series_number': '15'
            },
            {
                'modality': 'Axial_FLAIR',
                'series_number': '25'
            },
            {
                'modality': 'Coronal_T2',
                'series_number': '20'
            }
        ],
    },
    # {
    #     'mrn': '4851745', ## to update
    #     'scanner_strength': '3',
    #     'age': '4_months',
    #     'series': [
    #         {
    #             'modality': 'Sagittal_T1',
    #             'series_number': '6'
    #         },
    #         {
    #             'modality': 'Axial_T2',
    #             'series_number': '7'
    #         },
    #         {
    #             'modality': 'Axial_FLAIR',
    #             'series_number': '8'
    #         },
    #         {
    #             'modality': 'Coronal_T2',
    #             'series_number': '9'
    #         }
    #     ],
    # },
    {
        'mrn': '4601432-8341',
        'scanner_strength': '3',
        'age': '7_months',
        'series': [
            {
                'modality': 'Sagittal_T1',
                'series_number': '5'
            },
            {
                'modality': 'Axial_T2',
                'series_number': '6'
            },
            {
                'modality': 'Axial_FLAIR',
                'series_number': '100'
            },
            {
                'modality': 'Coronal_T2',
                'series_number': '19'
            }
        ],
    },
    {
        'mrn': '4601740-3765',
        'scanner_strength': '3',
        'age': '10_months',
        'series': [
            {
                'modality': 'Sagittal_T1',
                'series_number': '5'
            },
            {
                'modality': 'Axial_T2',
                'series_number': '7'
            },
            {
                'modality': 'Axial_FLAIR',
                'series_number': '6'
            },
            {
                'modality': 'Coronal_T2',
                'series_number': '14'
            }
        ],
    },
    {
        'mrn': '4858313-8507',
        'scanner_strength': '3',
        'age': '9_months',
        'series': [
            {
                'modality': 'Sagittal_T1',
                'series_number': '6'
            },
            {
                'modality': 'Axial_T2',
                'series_number': '7'
            },
            {
                'modality': 'Axial_FLAIR',
                'series_number': '8'
            },
            {
                'modality': 'Coronal_T2',
                'series_number': '16'
            }
        ],
    },
    {
        'mrn': '4645100-3548',
        'scanner_strength': '3',
        'age': '17_months',
        'series': [
            {
                'modality': 'Sagittal_T1',
                'series_number': '5'
            },
            {
                'modality': 'Axial_T2',
                'series_number': '6'
            },
            {
                'modality': 'Axial_FLAIR',
                'series_number': '10'
            },
            {
                'modality': 'Coronal_T2',
                'series_number': '11'
            }
        ],
    },
    {
        'mrn': '4633366-8530',
        'scanner_strength': '1.5',
        'age': '15_months',
        'series': [
            {
                'modality': 'Sagittal_T1',
                'series_number': '3'
            },
            {
                'modality': 'Axial_T2',
                'series_number': '4'
            },
            {
                'modality': 'Axial_FLAIR',
                'series_number': '5'
            },
            {
                'modality': 'Coronal_T2',
                'series_number': '6'
            }
        ],
    },
    {
        'mrn': '4883501-5190',
        'scanner_strength': '3',
        'age': '20_months',
        'series': [
            {
                'modality': 'Sagittal_T1',
                'series_number': '4'
            },
            {
                'modality': 'Axial_T2',
                'series_number': '6'
            },
            {
                'modality': 'Axial_FLAIR',
                'series_number': '5'
            },
            {
                'modality': 'Coronal_T2',
                'series_number': '14'
            }
        ],
    },
    {
        'mrn': '4607493-8566',
        'scanner_strength': '1.5',
        'age': '23_months',
        'series': [
            {
                'modality': 'Sagittal_T1',
                'series_number': '3'
            },
            {
                'modality': 'Axial_T2',
                'series_number': '4'
            },
            {
                'modality': 'Axial_FLAIR',
                'series_number': '5'
            },
            {
                'modality': 'Coronal_T2',
                'series_number': '7'
            }
        ],
    },
    {
        'mrn': '4517864-3937',
        'scanner_strength': '3',
        'age': '25_months',
        'series': [
            {
                'modality': 'Sagittal_T1',
                'series_number': '11'
            },
            {
                'modality': 'Axial_T2',
                'series_number': '12'
            },
            {
                'modality': 'Axial_FLAIR',
                'series_number': '13'
            },
            {
                'modality': 'Coronal_T2',
                'series_number': '20'
            }
        ],
    },
    {
        'mrn': '4622822-8610',
        'scanner_strength': '3',
        'age': '33_months',
        'series': [
            {
                'modality': 'Sagittal_T1',
                'series_number': '12'
            },
            {
                'modality': 'Axial_T2',
                'series_number': '4'
            },
            {
                'modality': 'Axial_FLAIR',
                'series_number': '5'
            },
            {
                'modality': 'Coronal_T2',
                'series_number': '6'
            }
        ],
    }
]

ageList = [
    -1,
    0,
    14,
    60,
    165,
    240,
    285,
    330,
    405,
    480,
    555,
    615,
    660,
    720,
    900,
    99999
]

def processDicomField(dcm_info, field):
    value = "no value provided"
    if field in dcm_info:
        value = pypx.utils.sanitize(dcm_info.data_element(field).value)
    return value

def saveMeta(data, nbFiles, dest):
    data['NumberOfImages'] = nbFiles
    # meta_path = os.path.join(dest, 'summary.json')
    # with open(meta_path, 'w') as outfile:
    #   json.dump(data, outfile)

def generateKey(age):
    # default age range
    from_age = ageList[0]
    to_age = ageList[1]

    previous = 0
    for item in ageList:
        if (age - previous >= 0) and (age - item < 0):
            from_age = previous
            to_age = item
            break
        previous = item

    return str(from_age) + '_' + str(to_age)

def generateMeta(data):
    # general fields
    series_description = processDicomField(data, 'SeriesDescription')
    series_number = processDicomField(data, 'SeriesNumber')
    series_uid = processDicomField(data, 'SeriesInstanceUID')
    study_description = processDicomField(data, 'StudyDescription')
    study_uid = processDicomField(data, 'StudyInstanceUID')
    patient_name = processDicomField(data, 'PatientName')
    patient_id = processDicomField(data, 'PatientID')

    # extract DICOM tags
    series_date_valid = True
    study_date_valid = True
    series_date = processDicomField(data, 'SeriesDate')
    study_date = processDicomField(data, 'StudyDate')
    patient_birth_date = processDicomField(data, 'PatientBirthDate')
    print('StudyDate ' + study_date)
    print('SeriesDate ' + series_date)
    print('PatientBirthDate ' + patient_birth_date)

    patient_age_valid = True
    patient_age = processDicomField(data, 'PatientAge')
    print('PatientAge ' + patient_age)

    patient_age_in_days = -1

    # compute patient age in days from series date and patient birthdate
    try:
        series_datetime = datetime.datetime.strptime(series_date, '%Y%m%d')
        patient_birth_date_dateiime = datetime.datetime.strptime(patient_birth_date, '%Y%m%d')
        delta_from_series = series_datetime - patient_birth_date_dateiime
        patient_age_in_days = delta_from_series.days
        
        print(str(patient_age_in_days) + ' days from series')
    except ValueError:
        series_date_valid = False
        print('Invalid SeriesDate or PatientBirthDate found')

    if not series_date_valid:
        try:
            study_datetime = datetime.datetime.strptime(study_date, '%Y%m%d')
            patient_birth_date_dateiime = datetime.datetime.strptime(patient_birth_date, '%Y%m%d')
            delta_from_series = study_datetime - patient_birth_date_dateiime
            patient_age_in_days = delta_from_series.days
            
            print(str(patient_age_in_days) + ' days from study')
        except ValueError:
            study_date_valid = False
            print('Invalid SeriesDate or PatientBirthDate found')

    # compute patient age in days from patient age
    if not study_date_valid:
        try:
            patient_age_reference = patient_age[-1].lower()
            patient_age_value = patient_age[-3:-1]
            age_datetime = datetime.datetime.strptime(patient_age_value, '%' + patient_age_reference)
            age_datetime_base = datetime.datetime.strptime('00', '%' + patient_age_reference)
            delta_from_age = age_datetime - age_datetime_base
            patient_age_in_days = delta_from_age.days
            print(str(patient_age_in_days) + ' days from age')
        except ValueError:
            print('Invalid PatientAge found')
    
    return {
        'SeriesDescription': series_description,
        'SeriesNumber': series_number,
        'StudyDescription': study_description,
        'SeriesInstanceUID': series_uid,
        'StudyInstanceUID': study_uid,
        'PatientName': patient_name,
        'PatientDateOfBirth': patient_birth_date,
        'StudyDate': study_date,
        'SeriesDate': series_date,
        'PatientAge': patient_age,
        'PatientAgeInDays': patient_age_in_days,
        'PatientID': patient_id,
    }

def generateJPG(src, dest):
    executable = '/usr/bin/dcmj2pnm' # '/usr/local/bin/dcmj2pnm'
    command = executable + ' +oj +Wh 15 +Fa ' + src + ' ' + dest
    response = subprocess.run(
        command, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, shell=True)

def resizeJPG(dest):
    executable = '/usr/bin/mogrify' #'/opt/ImageMagick/bin/mogrify'
    options = '-resize 96x96 -background none -gravity center -extent 96x96'
    source = os.path.join(dest, '*')
    command = executable + ' ' + options + ' ' + source
    response = subprocess.run(
        command, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, shell=True)

def previewJPG(src, dest):
    # create preview
    executable = '/usr/bin/convert' #'/opt/ImageMagick/bin/convert'
    options = '-append'
    output = os.path.join(dest, 'preview.jpg')
    command = executable + ' ' + options + ' ' + src + '/* ' + output
    response = subprocess.run(
        command, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, shell=True)

def anonymize(src, meta):
    patient_name = 'Normative patient'
    patient_id = '-'
    patient_birth_date = '-'
    patient_age = meta['SeriesDate']
    series_uid = 'ANONYMIZED'
    study_uid = 'ANONYMIZED'
    study_id = 'ANONYMIZED'
    sop_uid = 'ANONYMIZED'
    study_description = 'Normative patient provided by BCH (FNNDSC)'
    study_date = '-'
    series_description = meta['SeriesDescription']
    accession_number = 'ANONYMIZED'
    refering_physician = 'ANONYMIZED'
    other_patient_ids = 'ANONYMIZED'
    operators_name = 'ANONYMIZED'
    image_comments = 'ANONYMIZED'

    # create preview
    executable = '/usr/bin/dcmodify' #'/usr/local/bin/dcmodify'
    options = '-ie -gin -nb \
      -i "(0010,0030)=' + patient_birth_date + '" -i "(0010,1010)=' + patient_age + '"\
      -ma "(0010,0010)=' + patient_name + '" -ma "(0010,0020)=' + patient_id + '" -ma "(0010,0030)=' + patient_birth_date + '" \
      -ma "(0010,1010)=' + patient_age + '" -ma "(0020,000E)=' + series_uid + '" -ma "(0020,000D)=' + study_uid + '" \
      -ma "(0008,1030)=' + study_description + '" -ma "(0008,0020)=' + study_date + '" -ma "(0008,103E)=' + series_description + '" \
      -ma "(0008,0050)=' + accession_number + '" -ma "(0008,0090)=' + refering_physician + '" -ma "(0008,1070)=' + operators_name + '" \
      -ma "(0008,1155)=' + sop_uid + '" -ma "(0010,1000)=' + other_patient_ids + '" -ma "(0020,0010)=' + study_id + '" \
      -ma "(0020,4000)=' + image_comments + '"'
    output = os.path.join(src, '*')
    command = executable + ' ' + options + ' ' + output
    response = subprocess.run(
        command, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, shell=True)

def processStudy(study, patient):
    sorted_series = sorted(os.listdir(study))
    for series_name in sorted_series:
        source_series = os.path.join(study, series_name)
        print()
        print('--- SERIES')
        print(source_series)
        processSeries(source_series, patient)

def processSeries(series, patient):
    # generate jpgs for all dcm files
    sorted_images = sorted(os.listdir(series))
    series_name = ''
    processed = False
    target_key = '0_0'
    target_path = ''
    target_path_jpgs = ''
    meta_data = {}
    for filename in sorted_images:
        name, extension = os.path.splitext(filename)
        if extension == '.dcm':
            basename = os.path.basename(filename)
            source = os.path.join(series, basename)
            # output = os.path.join(destination, basename)
            if not processed:
                data = dicom.read_file(source)
                meta_data = generateMeta(data)
                # look if this series number is marked
                patient_series = patient['series']
                indices = [index for index in range(len(patient_series)) if patient_series[index]['series_number'] == meta_data['SeriesNumber']]
                if len(indices) <= 0:
                    return

                target_key = generateKey(meta_data['PatientAgeInDays'])
                meta_data['PatientAgeKey'] = target_key

                meta_data['SeriesDescription'] = patient_series[indices[0]]['modality']
                meta_data['SeriesDate'] = patient['age']
                print(meta_data)

                # create target directory
                # use meta data age in days instead of patient age key per new specs
                series_name = meta_data['SeriesDescription'] + '-' + meta_data['SeriesDate'] + '-' + meta_data['SeriesNumber']
                target_path = os.path.join(destination, str(meta_data['PatientAgeInDays']), series_name)
                # print(target_path)
                if not os.path.exists(target_path):
                  os.makedirs(target_path)
                saveMeta(meta_data, len(sorted_images), target_path)
                processed = True

            # create target jpg directory
            target_path_jpgs = os.path.join(target_path, 'jpgs')
            # print(target_path_jpgs)
            if not os.path.exists(target_path_jpgs):
                os.makedirs(target_path_jpgs)
            target_jpg = os.path.join(target_path_jpgs, filename + '.jpg')
            # print(source)
            # print(target_jpg)
            generateJPG(source, target_jpg)
            # copy file
            target_dcm = os.path.join(target_path, filename)
            shutil.copyfile(source, target_dcm)

    # generate preview for the series
    resizeJPG(target_path_jpgs)
    previewJPG(target_path_jpgs, target_path)
    # anomymize all dicom files over there
    anonymize(target_path, meta_data)

#
# START SCRIPT
#
for patient in patient_list:
    patient_target = os.path.join(target, patient['mrn'])
    print()
    print('--- PATIENT')
    print(patient_target)
    sorted_studies = sorted(os.listdir(patient_target))
    for studiesname in sorted_studies:
        source_study = os.path.join(patient_target, studiesname)
        print()
        print('--- STUDY')
        print(source_study)
        processStudy(source_study, patient)

exit()
