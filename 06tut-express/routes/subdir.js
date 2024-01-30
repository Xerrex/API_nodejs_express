const path = require("path");
const express = require("express");

const router = express.Router();
const viewsDir = path.join(__dirname, "..", "views", "subdir");


router.get("^/$|/index(.html)?", (req, res)=>{
  const viewFilePath = path.join(viewsDir, "index.html");
  res.sendFile(viewFilePath);
})


router.get("/test(.html)?", (req, res)=>{
  
  const viewFilePath = path.join(viewsDir, "test.html");
  res.sendFile(viewFilePath);
})


module.exports = router;