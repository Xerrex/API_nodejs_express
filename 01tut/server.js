console.log("Hello world");

// console.log(global) // global object

/** os and path
const os = require('os');
const path = require('path');


console.log(`Operating system type: ${os.type()}`);
console.log(`Operating system version: ${os.version()}`);
console.log(`Operating system Home directory: ${os.homedir()}`);


console.log(`\nFile directory: ${__dirname}`);
console.log(`File name: ${__filename}`);


console.log(`\nFile directory(path): ${path.dirname(__filename)}`);
console.log(`File name(path): ${path.basename(__filename)}`);
console.log(`File extension(path): ${path.extname(__filename)}`);

console.log(`\nFile (path): ${JSON.stringify(path.parse(__filename))}`);

*/

const { add, subtract, multiply, divide } = require('./math');

console.log(`Add: ${add(2,3)}`);
console.log(`Subtract: ${subtract(2,3)}`);
console.log(`Multiply: ${multiply(2,3)}`);
console.log(`Divide: ${divide(2,3)}`);