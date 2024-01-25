const logEvents = require("./logEvents");
const EventEmitter = require("events");

class MyEmitter extends EventEmitter {};



const myEmitter = new MyEmitter(); // Initialize the object

// Add Listener for log event

myEmitter.on("log", (msg)=>logEvents(msg));


// setTimeout(()=>{
//   myEmitter.emit("log", "Emitted log event"); //emit event
// }, 2000);

// setInterval(()=>{
//   myEmitter.emit("log", "Emitted log event"); //emit event
// }, 5000);
