const { format } = require("date-fns");
const { v4:uuid4 } = require("uuid"); // Import as defining

const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");


const logTimeFormat = ()=>{
  const currentDate = new Date();
  const dateFormat = "dd-MM-yyyy HH:mm:ss";
  const dateTime = `${format(currentDate, dateFormat)}`;
  return dateTime;
}


const logEvents = async (message, LogFileName="event_logs.txt")=>{
  const dateTime = logTimeFormat();
  const logItem = `${dateTime}  ${uuid4()}\t${message}\n`;
  // console.log(logItem);

  const logDirPath = path.join(__dirname, "..","logs");
  const logFilePath = path.join(logDirPath, LogFileName);


  try {
    if(!fs.existsSync(logDirPath)){
      await fsPromises.mkdir(logDirPath)
    }
    await fsPromises.appendFile(logFilePath, logItem);
  } catch (error) {
    console.log(error);
  }
}

const requestLogger = (req, res, next)=>{
  const logMessage =  `${req.method}\t${req.headers.origin}\t${req.url}`;
  logEvents(logMessage, "request-logs.txt");

  const consoleLogMessage = `${logTimeFormat()}\t${logMessage}`;
  console.log(consoleLogMessage);

  next();
}


module.exports = {logEvents, logTimeFormat, requestLogger};
