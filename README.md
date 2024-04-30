# API_nodejs_express
* An API to perform create, read, update and delete operations on users & employees

## Tools & Resources
- [Node.js v18.19.0 documentation](https://nodejs.org/docs/latest-v18.x/api/index.html)
- [Express](https://expressjs.com/)
- [npm Docs](https://docs.npmjs.com/)
- [mongoose](https://mongoosejs.com/)
- [Docker & Docker-Compose](https://www.docker.com/)
- [MongoDB](https://www.mongodb.com/)

## Table of Contents
- [Available routes](#available-routes)
- [Notes](#notes)
- [Project local setup](#project-local-setup)


## Available routes:
### User sign up
* Endpoint: /auth/signup
* Method: POST
* Auth: Bearer token
* Request body (json)
```json
{
  "username": "Alex Dev",
  "password": "Devpassword"
}
```
---

### User Sign In
* Endpoint: /auth/signin
* Method: POST
* Auth: Bearer token
* Request body (json)
```json
{
  "username": "Alex Dev",
  "password": "Devpassword"
}
```
---

### User Sign out
* Endpoint: /auth/signout
* Method: GET
---

### Handle Refresh token
* Endpoint: /auth/refresh
* Method: GET
* Auth: Bearer token
---


### Get Employees
* Endpoint: /employees
* Method: GET
* Auth: Bearer token
---

### Get Employee
* Endpoint: /employees/:id
* Method: GET
* Auth: Bearer token
---

### Add Employee
* Endpoint: /employees
* Method: POST
* Auth: Bearer token
* Request body (json)
```json
{
  "firstname": "Alex",
  "lastname": "Dev"
}
```
---

### Update Employee
* Endpoint: /employees
* Method: PUT
* Auth: Bearer token
* Request body (json)
```json
{
  "id": "66308d73220f640870663ab1",
  "firstname": "Alex",
  "lastname": "DevUpdated"
}
```
---

### Delete Employee
* Endpoint: /employees
* Method: DELETE
* Auth: Bearer token
* Request body (json)
```json
{"id":"66308d73220f640870663ab1"}
```


## Project local setup
* Coming soon

## Notes
### Generate token secrets
```js
node

require("crypto").randomBytes(64).toString("hex")
```

### File Database
```js
const path = require("path");
const fspromises = require("fs").promises;

const usersDB = {
  users: require("../model/users.json"),
  setUsers: function(data){this.users = data},
  storageFile: path.join(__dirname, "..", "model", "users.json")
  saveToFile: function(){ fspromises.writeFile(this.storageFile, JSON.stringify(this.users));}
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
await usersDB.saveToFile();


// Update User
  const foundUserUserName = "Alex Dev"
  const refreshToken = "sasasas"
  const otherUsers = usersDB.users.filter(user=> user.username !== foundUserUserName);

  const currentUser = {...foundUser, refreshToken};
  usersDB.setUsers([...otherUsers, currentUser]);
  await fspromises.writeFile(usersDB.storageFile, JSON.stringify(usersDB.users));
```

## Bookmark
* https://youtu.be/AWlLhRQJvtw?list=PL0Zuz27SZ-6PFkIxaJ6Xx_X46avTM1aYw&t=1236

## Credits
* [Video](https://www.youtube.com/watch?v=f2EqECiTBL8&t=4s)
* [Resources](https://github.com/gitdagray/node_js_resources)
