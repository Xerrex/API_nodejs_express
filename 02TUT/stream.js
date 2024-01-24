/** Large file handling */

const fs = require("fs")
const path = require("path");


const loremFilePath = path.join(__dirname, "files", "lorem.txt");
const newLoremFilePath = path.join(__dirname, "files", "new-lorem.txt");

const readStream = fs.createReadStream(loremFilePath, {encoding: "utf-8"});

const writeStream = fs.createWriteStream(newLoremFilePath);

// readStream.on("data", (dataChunk)=>{
//     writeStream.write(dataChunk);
// })

readStream.pipe(writeStream);