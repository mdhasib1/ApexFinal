const express = require("express");
const router = express.Router();
const {register,login,checkUser} = require('../Controllers/Users.controllers')

router.post("/" , register);
router.post("/" , login);
router.get("/:walletAddress" , checkUser);


module.exports = router;