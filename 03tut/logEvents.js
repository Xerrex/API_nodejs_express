console.log("Log events \n\n");

const { format } = require("date-fns");
const { v4:uuid4 } = require("uuid"); // Import as defining

const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");


const logEvents = async (message)=>{
  const currentDate = new Date();
  const dateFormat = "dd-MM-yyyy\tHH:mm:ss";
  const dateTime = `${format(currentDate, dateFormat)}`;
  const logItem = `${dateTime}\t${uuid4()}\t${message}\n`;
  console.log(logItem);

  const logDirPath = path.join(__dirname, "logs");
  const logFilePath = path.join(logDirPath, "event_logs.txt");


  try {
    if(!fs.existsSync(logDirPath)){
      await fsPromises.mkdir(logDirPath)
    }
    await fsPromises.appendFile(logFilePath, logItem);
  } catch (error) {
    console.log(error);
  }
}

module.exports = logEvents;
