#!/bin/sh

# retrieve plugin ids
dircopy_id=$(curl -s -u cube:cube1234 -H 'Accept: application/json' 'http://localhost:8000/api/v1/plugins/search/?name_exact=pl-dircopy' | jq '.results[0].id')
dsapp_id=$(curl -s -u cube:cube1234 -H 'Accept: application/json' 'http://localhost:8000/api/v1/plugins/search/?name_exact=pl-simpledsapp' | jq '.results[0].id')

echo "Create test feed:\n"
curl -u cube:cube1234 -XPOST -H 'Content-Type: application/vnd.collection+json' -d '{"template":{"data":[{"name":"dir", "value":"home/cube/uploads"}]}}' 'http://localhost:8000/api/v1/plugins/'${dircopy_id}'/instances/'
echo "\n"
sleep 5  # wait for the feed to be finished

echo "Create test pipelines:\n"
curl -u cube:cube1234 -X POST -H "Content-Type: application/vnd.collection+json" -d '{"template":{"data":[{"name":"name","value":"Test1"},{"name":"plugin_tree","value":"[{\"plugin_id\": '${dsapp_id}', \"title\": \"Plugin1\", \"previous\": null}, {\"plugin_id\": '${dsapp_id}', \"title\": \"Plugin2\", \"previous\": \"Plugin1\"}, {\"plugin_id\": '${dsapp_id}', \"title\": \"Plugin3\", \"previous\": \"Plugin1\"}]" }]}}' http://localhost:8000/api/v1/pipelines/ 
echo "\n"
curl -u cube:cube1234 -X POST -H "Content-Type: application/vnd.collection+json" -H "Accept: application/vnd.collection+json" -d '{"template":{"data":[{"name":"name","value":"Test2"}, {"name":"locked","value": false}, {"name":"plugin_tree","value":"[{\"plugin_id\": '${dsapp_id}', \"title\": \"Plugin1\", \"previous\": null}, {\"plugin_id\": '${dsapp_id}', \"title\": \"Plugin2\", \"previous\": \"Plugin1\"}, {\"plugin_id\": '${dsapp_id}', \"title\": \"Plugin3\", \"previous\": \"Plugin1\"}]" }]}}' http://localhost:8000/api/v1/pipelines/
echo "\n"

echo "Create test PACS query:\n"
curl -s -u cube:cube1234 'http://localhost:8000/api/v1/pacs/'  # retrieve the PACS list
echo "\n"
curl -u cube:cube1234 -X POST -H "Content-Type: application/vnd.collection+json" -d '{"template":{"data":[{"name":"title", "value":"Query1"},{"name":"query", "value":"{\"SeriesInstanceUID\": \"1.3.12\"}" }]}}' 'http://localhost:8000/api/v1/pacs/1/queries/'
echo "\n"
