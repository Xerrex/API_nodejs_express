const { logEvents } = require("./logEvents");

const errorHandler = (err, req, res, next) =>{
  const logMessage = `${req.method}\t${req.headers.origin}\t${req.url}\t ${err.name}: ${err.message}`;
  logEvents(logMessage, "error-log.txt");
  console.error(err.stack);
  res.status(500).send(err.message);
}

module.exports = errorHandler;