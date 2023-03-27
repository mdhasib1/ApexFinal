const express = require("express");
const router = express.Router();
const {
  CreateCollection,
  upload,
  getCollections,
  deleteCollection,
  getTotalCollection
} = require("../controllers/CollectionController");
const {protect,admin} = require("../middleWare/authMiddleware");

router.post("/", protect,upload, CreateCollection);
router.get("/", protect, getCollections);
router.delete('/:id', deleteCollection);
router.get('/totalCollection', getTotalCollection)


module.exports = router;
