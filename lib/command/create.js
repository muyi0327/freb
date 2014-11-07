/**
 * create <name> 创建工程命令
 */
var promptly = require('promptly');
var Promise = require('native-promise-only');
var fs = require('fs');
var cmd = require('../util/cmd.js');

module.exports = function(program){

    program
        .command('create <name>')
        .description('run create application commands')
        .action(function(name){
            var cmds = {
                install : []
            };
            /**
             * choose the application built tools
             * @returns {Promise}
             */
            function chooseBuildTools(){
                var tools = ['grunt', 'gulp', 'none'];

                tools.forEach(function(val, key){
                    console.log(key + '> ' + val);
                });

                return new Promise(function(resolve, reject){
                    promptly.choose('choose a build tools?', [0, 1, 2], {"default":0}, function(err, val){
                        console.log(err, val);
                        if(err){
                            reject(err);
                        }else{
                            cmds['install'].push(tools[val]);
                            resolve(val);
                        }
                    });
                });
            }

            /**
             * choose a css compile tools
             * @param val
             * @returns {Promise}
             */
            function chooseCssCompile(val){
                console.log(val);
                var tools = ['sass', 'less', 'stylus', 'none'];

                tools.forEach(function(val, key){
                    console.log(key + '> ' + val);
                });

                return new Promise(function(resolve, reject){
                    promptly.choose('choose a css compile tools?', [0, 1, 2, 3], {"default":0}, function(err, val){
                        console.log(err, val);
                        if(err){
                            reject(err);
                        }else{
                            cmds['install'].push('grunt-contrib-' + tools[val]);
                            resolve(tools[val]);
                        }
                    });
                });
            }

            /**
             * install node modules
             * @returns {Promise}
             */
            function installAll(val){
                console.log(val);
                return new Promise(function(resolve, reject){
                    cmd.exec('npm install '+cmds.install.join(' ') + ' -d', function(err){
                        if (err){
                            reject(err);
                        }else{
                            resolve('install all module ok!');
                        }
                    });
                });
            }

            function createAppFiles(){

            }

            /**
             * start commnad
             */
            chooseBuildTools()
                .then(chooseCssCompile)
                .then(installAll)
                .then(function(val){
                    console.log(val);
                });
        });
}