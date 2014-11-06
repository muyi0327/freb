/**
 * Created by muyi on 14-11-6.
 */
var cmd = require('./cmd.js');

cmd.exec('sudo npm install ejs jade -d', function(err){
    if (err){
        console.log(err);
    }else{
        console.log('success!');
    }
});