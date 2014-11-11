/**
 * Created by muyi on 14-11-6.
 */

var promptly = require('promptly'),
    fs = require('fs');

module.exports = function(program){
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
             * 是否设置完毕
             * @returns {Promise}
             */
            function isOk(){
                return new Promise(function(resolve, reject){
                    promptly.confirm('Configuration information ready<yes/no>?',function(err, val){
                        if (err){
                            reject(err);
                        }else{
                            if (val){
                                fs.writeFileSync(process.cwd() + '/freb.json', JSON.stringify(frebFile,null,4));
                                resolve(val);
                            }else{
                                reject('drop init!');
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
                .then(isOk)
                .then(function(val){
                    console.log('frebFile.json create done!');
                }, function(err){
                    console.log(err);
                });
        });
}