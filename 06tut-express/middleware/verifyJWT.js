const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET

const verifyJWT = (req, res, next)=>{
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.sendStatus(401);
  
  console.log(authHeader); // Bearer token
  
  const token = authHeader.split(' ')[1];

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded)=>{
    if (err) return res.sendStatus(403); //invalid token
    req.username = decoded.username;
    next();
  });
}

module.exports = verifyJWT