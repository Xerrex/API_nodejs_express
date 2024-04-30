const path = require("path");
const express = require("express");

const router = express.Router();
const viewsDir = path.join(__dirname, "..", "views");



router.get("^/$|/index(.html)?", (req, res)=>{
  const viewFilePath = path.join(viewsDir, "index.html");
  res.sendFile(viewFilePath);
})


router.get("/new-page(.html)?", (req, res)=>{
  res.redirect(301, "/index");
})


router.get("/old-page(.html)?", (req, res)=>{
  
  res.redirect(301, "/index");
})


router.get("/hello-world", (req, res, next)=>{
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

router.get("/chain(.html)?", [one, two, three]);


module.exports = router;