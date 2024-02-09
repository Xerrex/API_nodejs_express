const express = require("express");
const authController = require("../controllers/authController.js");


const router = express.Router();

router.post("/signup", authController.handleSignUp);
router.post("/signin", authController.handleSignIn);
router.get("/refresh", authController.handleRefreshToken);


module.exports = router;