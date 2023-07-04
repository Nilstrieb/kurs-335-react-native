#!/bin/sh

set -eu

cd $1

pwd

yarn install --locked
yarn eas build -p android --profile apk --local 
cd ..
cp $1/build-*.apk "result.apk"