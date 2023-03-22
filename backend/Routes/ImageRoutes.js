const express = require("express");
const router = express.Router();
const {
  getImage
} = require('../Controllers/imageController')

router.get("/:filename'" , getImage);


module.exports = router;