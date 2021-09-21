#!/bin/sh

# create a test feed
sleep 60
curl -u cube:cube1234 -XPOST -H 'Content-Type: application/vnd.collection+json' -d '{"template":{"data":[{"name":"dir","value":"cube/"}]}}' http://localhost:8000/api/v1/plugins/1/instances/
sleep 120

cd $TRAVIS_BUILD_DIR/js/chrisStoreAPI
yarn install
yarn test

cd $TRAVIS_BUILD_DIR/js/chrisAPI
yarn install
yarn test
