var page = require('webpage').create();
var system = require('system');

console.log('URL :' + system.args[1]);
console.log('FILE :' + system.args[2]);

page.viewportSize = { width: 1024, height: 768 };
//page.open('http://45.118.133.182:8899/template-hx.php?id=b1cd11f5_7aac_c5a3_3bc8_64dc51fa4520', function() {
page.open(system.args[1], function() {
  page.render('/home/priyanshu/x-series-pdf-generator/php/php/pdf-stash/'+system.args[2]+'.png');
  phantom.exit();
});
