#!/bin/bash
#/home/priyanshu/x-series-pdf-generator/php/php/node_modules/phantomjs-prebuilt/lib/phantom/bin/phantomjs /home/priyanshu/x-series-pdf-generator/php/php/phantom.js "http://45.118.133.182:8899/template-hx.php?id=b1cd11f5_7aac_c5a3_3bc8_64dc51fa4520" 083bc758279999ef2e7384f155194232.png
/home/priyanshu/x-series-pdf-generator/php/php/node_modules/phantomjs-prebuilt/lib/phantom/bin/phantomjs /home/priyanshu/x-series-pdf-generator/php/php/phantom.js "http://45.118.133.182:8899/template-hx.php?id=$1" $2 
convert /home/priyanshu/x-series-pdf-generator/php/php/pdf-stash/$2.png -quality 100 /home/priyanshu/x-series-pdf-generator/php/php/pdf-stash/$2.pdf
exit
