const express = require("express");
const router = express.Router();

const {
  getNFTs,
  createNFTs,
  upload,
  getNFTById,
  // updateNFTs,
  // deleteNFTs,
  // ownerPercentage,
  // fetchMyNFTs,
  buyNFT,
  // resale,
  // myNFTsCreated,
  // placeBid,
} = require("../Controllers/nftControllers");

router.get("/" , getNFTs);
router.get("/:tokenId" , getNFTById);
router.post("/" ,upload, createNFTs);
// router.put("/:id" , updateNFTs);
// router.delete("/:id" , deleteNFTs);
// router.put("/:id/ownerPercentage" , ownerPercentage);
// router.get("/:owner" , fetchMyNFTs);
router.put("/:tokenId" , buyNFT);
// router.post("/:id" , resale);
// router.get("/" , myNFTsCreated);

// router.post("/:id/placeBid" , placeBid);



module.exports = router;