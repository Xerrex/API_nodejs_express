// const fs = require("fs");
// const path = require("path");

// const starter_file_path = "./files/starter.txt";
// const starter_file_path = "./files/starter3.txt"; //For uncaught errors
// const starterFilePath = path.join(__dirname, "files", "starter.txt")

// fs.readFile(starter_file_path, (err, data)=>{
// fs.readFile(starterFilePath, "utf8", (err, data)=>{
//     if (err) throw err;
//     // console.log(data.toString());
//     console.log(data);
// })

// const replyFilePath = path.join(__dirname, "files", "reply.txt")
// const replyContent = "Nice to meet you, Alex.";


// fs.writeFile(replyFilePath, replyContent,(err)=>{
//     if (err) throw err;

//     console.log("Write is complete");

//     const newReplyContent = "\n\nYes it is."
//     fs.appendFile(replyFilePath, newReplyContent, (err)=>{
//         if (err) throw err;
//         console.log("Append is complete");
//     })
// })

/** Avoiding call back hell */
const fsPromises = require("fs").promises;
const path = require("path");


const fileOps = async () =>{

  const starterFilePath = path.join(__dirname, "files", "starter.txt");
  const promiseWriteFilePath = path.join(__dirname, "files", "promiseWrite.txt");
  const newPromiseWriteFilePath = path.join(__dirname, "files", "promiseWriteComplete.txt");

  try {
    const data = await fsPromises.readFile(starterFilePath, "utf-8");
    console.log(data);

    // await fsPromises.unlink(starterFilePath, data); // Delete Unlink file

    await fsPromises.writeFile(promiseWriteFilePath, data);
    await fsPromises.appendFile(promiseWriteFilePath, "\nNice to meet you, Alex.");
    await fsPromises.rename(promiseWriteFilePath, newPromiseWriteFilePath);

    const newData = await fsPromises.readFile(newPromiseWriteFilePath, "utf-8");
    console.log(newData);

  } catch (error) {
    console.error(error);
  }
}

fileOps();

process.on("uncaughtException", err=>{
  console.error(`There was an Uncaought error: ${err}`);
  process.exit(1);
})