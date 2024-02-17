const path = require("path");
const express = require("express");
const cors =  require("cors");
const cookieParser = require("cookie-parser");
const { requestLogger } = require("./middleware/logEvents");
const errorHandler  = require("./middleware/errorHandler");
const credentials = require("./middleware/credentials");
const verifyJWT = require("./middleware/verifyJWT");
const corsOptions = require("./config/corsOptions");

const app = express();
const PORT = process.env.PORT || 3500;



app.use(requestLogger);
app.use(credentials);
app.use(cors(corsOptions)); // Cross origin resource sharing

app.use(express.urlencoded({extended: false})); // middleware to handle form data
app.use(express.json()); // json middleware

app.use(cookieParser()); //middleware for cookies

const staticFilePath = path.join(__dirname, "/public");
app.use(express.static(staticFilePath));


app.use("/", require("./routes/root")); // root routes
app.use("/auth", require("./routes/auth")); // auth routes

app.use(verifyJWT);
app.use("/employees", require("./routes/api/employees"));


app.all("*", (req, res)=>{
  res.status(404)

  if(req.accepts("html")){
    const pageFilePath = path.join(__dirname, "views", "404.html");
    res.status(404).sendFile(pageFilePath);
  } else if(req.accepts("json")){
    res.json({error: "404 Not Found"});
  }else {
    res.type("txt").send("404 Not Found")
  }
  
});


app.use(errorHandler);


const serverRunningMsg = `Server Running on port: ${PORT}`;
app.listen(PORT, ()=> console.log(serverRunningMsg));




