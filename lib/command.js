/**
 * Created by muyi on 14-11-3.
 */

module.exports = function(program){
    /**
     * 创建工程
     */
    require('./command/create.js')(program);

    /**
     * init 初始化配置工程
     */
    require('./command/init.js')(program);
}