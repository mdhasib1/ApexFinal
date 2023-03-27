
const mongoose = require('mongoose');

const CollectionNFT = new mongoose.Schema({
user: {
 type: String,
 ref: "users",
 required: true,
},
  collectionname: {
    type: String,
    required: true,
  },
  collectionimage:{
    type: String,
    required: true
  },
  collectiondes: {
    type: String,
    required: true
  },
},
 { timestamps: true }
);

module.exports = mongoose.model('CollectionNFT', CollectionNFT);
