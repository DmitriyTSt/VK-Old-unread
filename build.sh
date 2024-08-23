#!/bin/sh
version=$(jq '.version' manifest.json | tr -d '"')
mkdir -p build/chrome
echo "Start copy files"
cp manifest.json build/chrome/manifest.json
cp icon.png build/chrome/icon.png
cp content.js build/chrome/content.js
cp vkou.js build/chrome/vkou.js
cp vkou_lib.js build/chrome/vkou_lib.js
cp oldbg.css build/chrome/oldbg.css
cd build/chrome || exit
echo "Start zip files"
zip -r ../../vk-old-unread-"${version}".zip .
echo "Build success version ${version}"