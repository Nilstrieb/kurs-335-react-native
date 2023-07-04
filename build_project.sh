#!/bin/sh

cd $1
yarn
yarn eas build -p android --profile apk --local 
cd ..
cp $1/build-*.apk "result.apk"