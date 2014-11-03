/**
 * Created by Administrator on 14-11-1.
 */
var fs = require('fs');
var Promise = require('native-promise-only');
var program = require('commander');
var promptly = require('promptly');

module.exports = function(){
    program
        .command('init')
        .action(function(){
            var fredFile = fs.writeFileSync(process.cwd() + '/fred.json','{}');

            function setAppName(){
                var p =  Promise();

                promptly.prompt('aplication name:<app>', function(err, val){
                    if (err){
                        p.reject(err);
                    }else{
                        p.resolve(val || 'app');
                    }
                });
                return p;
            }

            function setAuthor(){
                var p = Promise();
                promptly.prompt('author:<youlai>', function(err, val){
                    if (err){
                        p.reject(err);
                    }else{
                        p.resolve(val || 'app');
                    }
                });
                return p;
            }

            setAppName()
                .then(setAuthor())
                .then(function(){
                    console.log('create done!');
                });
        });
};