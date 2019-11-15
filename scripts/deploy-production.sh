#!/usr/bin/env bash

SOURCE_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)

ENVNAME=production

cd $SOURCE_DIR/..

echo -e "\nBacking up config.json..."
mv ./src/config.json ./src/config.json.backup

echo -e "\nCopying ${ENVNAME} config..."
cp ./configs/config-${ENVNAME}.json ./src/config.json

echo -e "\nInstalling node modules..."
npm install

echo -e "\nBuilding dist bundle..."
npm run-script build

echo -e "\nDeploying..."
rsync -ravP --delete ./build/* iwp6.iwphys.org:/var/www/iwp6.iwphys.org/designer-preview/ 

echo -e "\nRestoring existing config.json..."
mv ./src/config.json.backup ./src/config.json

