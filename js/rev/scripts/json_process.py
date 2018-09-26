#!/usr/bin/env python3

import argparse
import json
import os
import pudb

parser = argparse.ArgumentParser(description='Generate description.json')
parser.add_argument('-d', dest="str_directory")
args = parser.parse_args()

str_directory = args.str_directory
l_demo = []
l_description = []


#function that list the directories of all demo.json files in a python list
def dir_list(str_directory):
    
    #list all the content of the actual directory
    l_sorted_images = sorted(os.listdir(str_directory))
    for str_filename in l_sorted_images:
        str_name, str_extension = os.path.splitext(str_filename)

        # discard files that start with '.'
        if str_name.startswith('.') == True:
            continue

        # open folders
        if os.path.isdir(str_directory + '/'+ str_filename):
            str_subdirectory = str_directory + '/'+ str_filename
            dir_list(str_subdirectory)


        # discard files that do not end with '.json' or ''
        if not (str_extension == '.json'):
            continue

        # if the curent file check is a demo.json then we store it in the list
        str_basename = os.path.basename(str_filename)
        if str_basename == 'demo.json':
            str_source = os.path.join(str_directory, str_basename)
            l_demo.append(str_source)

    return l_demo

#function that open all the json of a list
def json_open(l_demo):
    #pudb.set_trace()
    i=0
    for str_jsonfile in l_demo:
        with open(l_demo[i]) as data_file:    
            d_data = json.load(data_file)
            l_description.append(d_data['query']['data'][0])
            i += 1
    return l_description            

#function that create the description.json
def json_create(l_description):
    
    json_obj = {
            "data": l_description,
    }

    with open('description.json', 'w') as outfile:
        json.dump(json_obj, outfile)


l_demo          = dir_list(str_directory)
l_description   = json_open(l_demo)
json_create(l_description)







