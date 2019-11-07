#!/bin/sh

npm run build && rsync -ravP build/* iwp6.iwphys.org:/var/www/iwp6.iwphys.org/designer-preview/ 
