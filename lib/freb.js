/**
 * Created by yang.fei on 2014/10/30.
 */

"use strict";

var fs = require('fs');

exports.lower = function(file){
    console.log('read file:' +  file);

    if (fs.existsSync(file)){
        var content = fs.readFileSync(file, 'utf-8');
        console.log('内容转化为小写：');
        console.log(content.toLowerCase());
    }else{
        console.log("File does not exist - " + file);
    }
}