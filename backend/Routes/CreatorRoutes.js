const express = require("express");
const router = express.Router();
const {protect,admin} = require("../middleWare/authMiddleware");

const {
  getCreator

} = require('../controllers/userController')


router.get("/",   getCreator);



module.exports = router;