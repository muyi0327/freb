/**
 * Created by muyi on 14-11-3.
 */
module.exports = function(program){
    program
        .version('0.1.0')
        .option('-p, --peppers', 'Add peppers')
        .option('-P, --pineapple', 'Add pineapple')
        .option('-b, --bbq', 'Add bbq sauce')
        .option('-g, --grunt', 'use grunt tools')
        .option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble');
}