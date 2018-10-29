#!/bin/sh
cd $TRAVIS_BUILD_DIR/js/chrisStoreAPI
yarn install
yarn test
cd $TRAVIS_BUILD_DIR/js/chrisAPI
yarn install
yarn test
