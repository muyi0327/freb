/**
 * Created by muyi on 14-11-3.
 */
var promptly = require('promptly');
var Promise = require('native-promise-only');
var fs = require('fs');
var cmd = require('./util/cmd.js');

module.exports = function(program){
    /**
     * install <name>命令
     *
     */
    program
        .command('install <name>')
        .description('run remote setup commands')
        .action(function(name){
            console.log('install ' + name);
        });

    /**
     * create <name> 创建工程命令
     */
    program
        .command('create <name>')
        .description('run create application commands')
        .action(function(name){
            console.log('create ' + name);
        });

    /**
     * init 初始化配置工程
     *
     */
    program
        .command('init')
        .description('run init freb.json file commands')
        .action(function(){
            var frebFile = {};

            /**
             * 设置应用名称
             * @returns {Promise}
             */
            function setAppName(){
                return new Promise(function(resolve, reject){
                    promptly.prompt('aplication name:<freb-app>', {"default": "freb-app"}, function(err, val){
                        if (err){
                            reject(err);
                        }else{
                            frebFile.name = val;
                            resolve(val);
                        }
                    });
                });
            }

            /**
             * 设置开发者
             * @returns {Promise}
             */
            function setAuthor(){
                return new Promise(function(resolve, reject){

                    promptly.prompt('author:<youlai>', {"default": "youlai"},function(err, val){
                        if (err){
                            reject(err);
                        }else{
                            frebFile.author = val;
                            resolve(val);
                        }
                    });
                });
            }

            /**
             * 设置版本号
             * @returns {Promise}
             */
            function setVersion(){
                return new Promise(function(resolve, reject){

                    promptly.prompt('version:<v0.0.0>', {"default": "v0.0.0"},function(err, val){
                        if (err){
                            reject(err);
                        }else{
                            frebFile.version = val;
                            resolve(val);
                        }
                    });
                });
            }

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
                    promptly.choose('choose a build tools?', [0, 1, 2], {"default":2}, function(err, val){
                        if(err){
                            reject(err);
                        }else{
                            frebFile.builtTools = val == 2 ? '' : tools[val];

                            if (frebFile.builtTools){
                                cmd.exec('npm install '+frebFile.builtTools + ' -d', function(err){
                                    if (err){
                                        reject(err);
                                    }else{
                                        resolve(val);
                                    }
                                });
                            }
                        }
                    });
                });
            }

            /**
             * 是否设置完毕
             * @returns {Promise}
             */
            function isOk(){
                return new Promise(function(resolve, reject){
                    promptly.confirm('Configuration information ready<yes/no>?', {"default":'yes'},function(err, val){
                        if (err){
                            reject(err);
                        }else{
                            if (val){
                                fs.writeFileSync(process.cwd() + '/freb.json', JSON.stringify(frebFile,null,4));
                                resolve(val);
                            }else{
                                reject();
                            }

                        }
                    });
                });
            }

            /**
             * 执行
             */
            setAppName()
                .then(setAuthor)
                .then(setVersion)
                .then(chooseBuildTools)
                .then(isOk)
                .then(function(){
                    console.log('frebFile.json create done!');
                });
        });
}