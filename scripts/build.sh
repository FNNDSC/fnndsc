#!/bin/sh
cd $TRAVIS_BUILD_DIR/js/cubeStoreAPI
yarn install
yarn test
