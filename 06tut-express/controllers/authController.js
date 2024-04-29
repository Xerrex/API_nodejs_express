const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../model/User")


dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET


const handleSignUp = async (req, res)=>{
  const {username, password } = req.body;
  if (!username || !password) return res.status(400).json({"message": "username and password are required"});

  const duplicates = await User.findOne({username: username}).exec();

  if (duplicates) return res.status(409).json({"message": `username "${username}" is already taken`});

  try {

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and store new user
    const createdUser = await User.create({
      "username": username,
      "password":hashedPassword
    });

    console.log(createdUser);
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
    const roles = Object.values(foundUser.roles);

    
    // NOTE: Create tokens
    const accessTokenPayload = {
      "UserInfo":{
        "username": foundUser.username,
        "roles": roles
      }
    }

    const accessToken = jwt.sign(accessTokenPayload, ACCESS_TOKEN_SECRET, {expiresIn: "60s"});
    const refreshToken = jwt.sign({"username": foundUser.username}, REFRESH_TOKEN_SECRET, {expiresIn: "1d"});

    const otherUsers = usersDB.users.filter(user=> user.username !== foundUser.username);
    const currentUser = {...foundUser, refreshToken};
    usersDB.setUsers([...otherUsers, currentUser]);
    await fspromises.writeFile(usersDB.storageFile, JSON.stringify(usersDB.users));
    
    // NOTE: Remove secure: true when working in dev environment
    res.cookie("jwt", refreshToken, {httpOnly: true, sameSite: "None", secure: true, maxAge: 24 * 60 * 60 * 1000});
    res.json({accessToken})

  } else{
    res.sendStatus(401);
  }
}


const handleRefreshToken = (req, res) =>{
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  
  const refreshToken = cookies.jwt;
  console.log(refreshToken);
  
  const foundUser = usersDB.users.find(user => user.refreshToken === refreshToken);
  if (!foundUser) return res.sendStatus(403); //Forbidden 

  jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, decoded)=>{
    if (err || foundUser.username !== decoded.username) return res.sendStatus(403);

    const roles = Object.values(foundUser.roles);
    // NOTE: Create tokens
    const accessTokenPayload = {
      "UserInfo":{
        "username": foundUser.username,
        "roles": roles
      }
    }
    const accessToken = jwt.sign(accessTokenPayload, ACCESS_TOKEN_SECRET, {expiresIn: "60s"});

    res.json({accessToken});
  });
}


const handleSignOut = async (req, res)=>{
  // NOTE: Delete access token in the frontend.
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);

  const refreshToken = cookies.jwt;
  console.log(refreshToken);
  
  const foundUser = usersDB.users.find(user => user.refreshToken === refreshToken);
  if (!foundUser) {
    res.clearCookie("jwt", {httpOnly: true})
    return res.sendStatus(403); //Forbidden
  }

  const otherUsers = usersDB.users.filter(user => user.refreshToken !== foundUser.refreshToken);
  const currentUser = {...foundUser, refreshToken: ""};
  usersDB.setUsers([...otherUsers, currentUser]);
  await fspromises.writeFile(usersDB.storageFile, JSON.stringify(usersDB.users));

  res.clearCookie("jwt", {httpOnly: true, sameSite: "None", secure: true}); // NOTE: Secure:true -only serves on https
  res.sendStatus(204);
}


module.exports = { handleSignUp, handleSignIn, handleRefreshToken, handleSignOut};
