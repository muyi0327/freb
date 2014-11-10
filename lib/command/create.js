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
                npms : program.build ? [program.build] : [],
                bowers : program.css ? [program.css] : []
            };
            /**
             * choose the application built tools
             * @returns {Promise}
             */
            function chooseBuildTools(){
                var tools = ['grunt', 'gulp', 'none'];

                if (!program.build){
                    tools.forEach(function(val, key){
                        console.log(key + '> ' + val);
                    });

                    return new Promise(function(resolve, reject){
                        promptly.choose('choose a build tools?', [0, 1, 2], {"default":0}, function(err, val){
                            if(err){
                                reject(err);
                            }else{
                                cmds['npms'].push(tools[val]);
                                resolve(val);
                            }
                        });
                    });
                }

                return  Promis.resolve(program.build);
            }

            /**
             * choose a css compile tools
             * @param val
             * @returns {Promise}
             */
            function chooseCssCompile(val){
                var tools = ['sass', 'less', 'stylus', 'none'];
                console.log(program.sass);
                if (!program.css){
                    tools.forEach(function(val, key){
                        console.log(key + '> ' + val);
                    });

                    return new Promise(function(resolve, reject){
                        promptly.choose('choose a css compile tools?', [0, 1, 2, 3], {"default":0}, function(err, val){
                            console.log(err, val);
                            if(err){
                                reject(err);
                            }else{
                                cmds['bowers'].push('grunt-contrib-' + tools[val]);
                                resolve(tools[val]);
                            }
                        });
                    });
                }

                return Promise.resolve(program.css);
            }

            /**
             * install node modules
             * @returns {Promise}
             */
            function installNpm(val){

                return new Promise(function(resolve, reject){
                    cmd.exec('npm install '+cmds.npms.join(' ') + ' -d', function(err){
                        if (err){
                            reject(err);
                        }else{
                            resolve('install all modules ok!');
                        }
                    });
                });
            }

            /**
             *
             * @param val
             * @returns {Promise}
             */
            function installBower(val){
                return new Promise(function(resolve, reject){
                    cmd.exec('npm install '+cmds.bowers.join(' ') + ' -d', function(err){
                        if (err){
                            reject(err);
                        }else{
                            resolve('install all module ok!');
                        }
                    });
                });
            }


            /**
             * start commnad
             */

            function startCreateCommad(){
                chooseBuildTools()
                    .then(chooseCssCompile)
                    .then(installNpm)
                    .then(installBower)
                    .then(function(val){
                        console.log(val);
                    });
            }

            /**
             * 如果文件夹不存在，直接创建，否则选择是否覆盖？
             */
            fs.exists(process.cwd() + '/' + name, function(exists){
                if (exists){
                    promptly.confirm('The directory '+name+' already exists, overwrite? <yes/no> ', function(err, val){
                        if (err){
                            console.log(err);
                            return;
                        }

                        if (val){
                            startCreateCommad();
                        }else{
                            console.log('create dropped!');
                        }
                    });
                }else{
                    startCreateCommad();
                }
            });
        });
}