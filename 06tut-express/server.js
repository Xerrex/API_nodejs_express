const path = require("path");
const express = require("express");
const cors =  require("cors");
const { requestLogger } = require("./middleware/logEvents");

const app = express();
const PORT = process.env.PORT || 3500;


app.use(requestLogger);
app.use(cors()); // Cross origin resource sharing

app.use(express.urlencoded({extended: false})); // middleware to handle form data
app.use(express.json()); // json middleware

const staticFilePath = path.join(__dirname, "/public");
app.use(express.static(staticFilePath));


app.get("^/$|/index(.html)?", (req, res)=>{
  // res.send("Hello World");
  // res.sendFile("./views/index.html", {root: __dirname});
  const indexFilePath = path.join(__dirname, "views", "index.html");
  res.sendFile(indexFilePath);
})


app.get("/new-page(.html)?", (req, res)=>{
  
  const pageFilePath = path.join(__dirname, "views", "new-page.html");
  res.sendFile(pageFilePath);
})


app.get("/old-page(.html)?", (req, res)=>{
  
  res.redirect(301, "/new-page");
})


app.get("/hello-world", (req, res, next)=>{
  console.log("Attempted to load hello world");
  next()
}, (req, res)=>{
  res.send("Hello World");
})


const one = (req, res, next)=>{
  console.log("One");
  next()
}

const two = (req, res, next)=>{
  console.log("Two");
  next();
}

const three = (req, res, next)=>{
  console.log("Three");
  res.send("Finished Chain")
}

app.get("/chain(.html)?", [one, two, three]);


app.get("/*", (req, res)=>{
  
  const pageFilePath = path.join(__dirname, "views", "404.html");
  res.status(404).sendFile(pageFilePath);
})


const serverRunningMsg = `Server Running on port: ${PORT}`;
app.listen(PORT, ()=> console.log(serverRunningMsg));




