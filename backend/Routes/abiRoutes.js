const express = require("express");
const router = express.Router();
const {
  getAbi
} = require('../Controllers/abiController')

router.get("/" , getAbi);


module.exports = router;