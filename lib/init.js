/**
 * Created by Administrator on 14-11-1.
 */
var fs = require('fs');
var Promise = require('native-promise-only');
var program = require('commander');
var promptly = require('promptly');

program
    .command('init')
    .action(function(){
        var fredFile = fs.writeFileSync(process.cwd() + '/fred.json','{}');

        var promise = new Promise(function(resolve, reject){
            promptly.prompt('aplication name:<app>', function(err, val){
                if (err){
                    reject(err);
                }else{
                    resolve(val || 'app');
                }
            });
        });

        promise.then(function(val){
            promptly.prompt('author:<youlai>', function(err, val){
                if (err){
                    promise.reject(err);
                }else{
                    promise.resolve(val || 'app');
                }
            });
        }, function(err){

        });

    });