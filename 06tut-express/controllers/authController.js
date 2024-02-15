const path = require("path");
const fspromises = require("fs").promises;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET


const usersDB = {
  users: require("../model/users.json"),
  setUsers: function(data){this.users = data},
  storageFile: path.join(__dirname, "..", "model", "users.json")
}


const handleSignUp = async (req, res)=>{
  const {username, password } = req.body;
  if (!username || !password) return res.status(400).json({"message": "username and password are required"});

  const duplicates = usersDB.users.find(user=> user.username === username);
  if (duplicates) return res.status(409).json({"message": `username "${username}" is already taken`});

  try {

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {"username":username, "password":hashedPassword}
    usersDB.setUsers([...usersDB.users, newUser])


    await fspromises.writeFile(usersDB.storageFile, JSON.stringify(usersDB.users));

    console.log(usersDB.users);
    res.status(201).json({ "message":`User "${username}" was registered successfully` })
    
  } catch (error) {
    res.status(500).json({"message": error.message});
    
  }
}


const handleSignIn = async(req, res)=>{
  const {username, password } = req.body;
  if (!username || !password) return res.status(400).json({"message": "username and password are required"});
  const foundUser = usersDB.users.find(user=> user.username === username);

  if(!foundUser) return res.status(401).json({"message": "Unauthorized"})

  const match = await bcrypt.compare(password, foundUser.password);
  if (match){
    // NOTE: Create
    const accessToken = jwt.sign({"username": foundUser.username}, ACCESS_TOKEN_SECRET, {expiresIn: "60s"});
    const refreshToken = jwt.sign({"username": foundUser.username}, REFRESH_TOKEN_SECRET, {expiresIn: "1d"});

    const otherUsers = usersDB.users.filter(user=> user.username !== foundUser.username);
    const currentUser = {...foundUser, refreshToken};
    usersDB.setUsers([...otherUsers, currentUser]);
    await fspromises.writeFile(usersDB.storageFile, JSON.stringify(usersDB.users));
    
    res.cookie("jwt", refreshToken, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000});
    res.json({accessToken})

  } else{
    res.sendStatus(401);
  }
}


const handleRefreshToken = (req, res) =>{
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.status(401);
  
  const refreshToken = cookies.jwt;
  console.log(refreshToken);
  
  const foundUser = usersDB.users.find(user => user.refreshToken === refreshToken);
  if (!foundUser) return res.sendStatus(403); //Forbidden 

  jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, decoded)=>{
    if (err || foundUser.username !== decoded.username) return res.sendStatus(403);

    const payload =  { "username": decoded.username }
    const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {expiresIn: "60s"});

    res.json({accessToken});
  });
}


const handleSignOut = (req, res)=>{
  // NOTE: Delete access token in the frontend.
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
}


module.exports = { handleSignUp, handleSignIn, handleRefreshToken};
