/**
 * Created by yang.fei on 2014/10/30.
 */
var freb = require('../lib/freb.js');
var path = require('path');
var fs = require('fs');

var dir = path.dirname(fs.realpathSync(__filename));

console.log(dir);

freb.lower(dir + '/data/test.txt');
