/**
 * Created by muyi on 14-11-3.
 */
var promptly = require('promptly');
var Promise = require('native-promise-only');
var fs = require('fs');

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
        .action(function(name){
            console.log('create ' + name);
        });

    /**
     * init 初始化配置工程
     *
     */
    program
        .command('init')
        .action(function(){
            var frebFile = {

            };

            /**
             * Sets the application name
             * @default freb-app
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
             * set the author
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
             * set a version number
             * @default v0.0.0
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
             * choose a built tools
             * @returns {Promise}
             */
            function chooseBuildTools(){
                var tools = ['grunt', 'gulp', 'none'];

                function validator(val){
                    console.log(val);
                    return val;
                }

                tools.forEach(function(val, key){
                    console.log(key + '>' + ' ' +val);
                });

                return  new Promise(function(resolve, reject){
                    promptly.choose('choose a build tools?', tools, {validator:validator},function(err, val){
                        console.log(val);
                        if(err){
                            reject(err);
                        }else{
                            frebFile.builtTools = val=='none'? '':val;
                            resolve(val);
                        }
                    });
                });
            }

            /**
             * is config ready?
             * @returns {Promise}
             */
            function isOk(){
                return new Promise(function(resolve, reject){
                    promptly.confirm('Configuration information ready?<yes/no>', {"default":'yes'},function(err, val){
                        if (err){
                            reject(err);
                        }else{
                            if (val){
                                frebFile.dependences = {
                                    a : '123',
                                    b : 'abc'
                                };
                                fs.writeFileSync(process.cwd() + '/freb.json', JSON.stringify(frebFile,null,4));
                                resolve(val);
                            }else{
                                reject();
                            }

                        }
                    });
                });
            }



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