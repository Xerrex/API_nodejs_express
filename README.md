# Node Snack
* Repo for my learning nodejs

## Notes
- Learnt exporting and Importing

## Generate token secrets
```js
node

require("crypto").randomBytes(64).toString("hex")
```

## Resources
- [Node.js v18.19.0 documentation](https://nodejs.org/docs/latest-v18.x/api/index.html)
- [npm Docs](https://docs.npmjs.com/)

## Notes
### File Database
```js
const path = require("path");
const fspromises = require("fs").promises;

const usersDB = {
  users: require("../model/users.json"),
  setUsers: function(data){this.users = data},
  storageFile: path.join(__dirname, "..", "model", "users.json")
}

// find a user
const username = "Alex Dev"
const user = usersDB.users.find(user=> user.username === username);


// Save New User
const newUser = {
    "username":username, 
    "roles":{"User": 2001}, 
    "password":hashedPassword
}

usersDB.setUsers([...usersDB.users, newUser])

await fspromises.writeFile(usersDB.storageFile, JSON.stringify(usersDB.users));
```

## Bookmark
* https://www.youtube.com/watch?v=AWlLhRQJvtw&list=PL0Zuz27SZ-6PFkIxaJ6Xx_X46avTM1aYw&index=15

## Credits
* [Video](https://www.youtube.com/watch?v=f2EqECiTBL8&t=4s)
* [Resources](https://github.com/gitdagray/node_js_resources)
