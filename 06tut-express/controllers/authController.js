const path = require("path");
const fspromises = require("fs").promises;
const bcrypt = require("bcrypt");


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
    res.json({
      "message": "Successful login",
      "success": `User ${username} is logged in!`
    })
  } else{
    res.sendStatus(401);
  }
}

module.exports = { handleSignUp, handleSignIn };
