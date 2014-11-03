/**
 * Created by yang.fei on 2014/10/30.
 */

"use strict";

exports.init = function(){
    var program = require('commander');

    require('../lib/help.js')(program);
    require('../lib/command.js')(program);

    program.parse(process.argv);
}
