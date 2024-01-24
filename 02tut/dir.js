const fs = require("fs")
const path = require("path");

const newDirPath = path.join(__dirname, "new");

if (!fs.existsSync(newDirPath)){
    fs.mkdir(newDirPath, (error)=>{
        if(error) throw error;
        console.log("Directory created");
    })
}


if (!fs.existsSync(newDirPath)){
    fs.rmdir(newDirPath, (error)=>{
        if(error) throw error;
        console.log("Directory removed");
    })
}