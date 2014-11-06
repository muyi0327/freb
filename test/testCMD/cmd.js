/**
 * Created by muyi on 14-11-6.
 */

exports.exec = function(cmd, callback){
    var spawn=require('child_process').spawn;
    try {
        var stdout = "";
        var stderr = "";

        var child;
        if ('win32' === process.platform) {
            child = spawn('cmd.exe', ['/s', '/c', '"' + cmd + '"'],
                {windowsVerbatimArguments:true, stdio: [process.stdin, 'pipe', 'pipe']} );
        }else {
            child = spawn('/bin/sh', ['-c', cmd]);
        }

        child.stdout.on("data",function (data) {
            process.stdout.write(data.toString());
            stdout += data;
        });

        child.stderr.on("data",function (data) {
            process.stdout.write(data.toString());
            stderr += data;
        });

        child.on("exit",function (code) {
            callback(code===0 ? null : new Error("rsync exited with code "+code), stdout, stderr, cmd);
        });
    } catch (err) {
        callback(err,null,null,cmd);
    }
}
