
const mongoose = require('mongoose');

const marketItemSchema = new mongoose.Schema({
  tokenId: {
    type: Number,
    required: true,
  },
  owner:{
    type: String,
    required: true
  },
  seller: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  sold: {
    type: Boolean,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  nftcollection: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image:{
    type:String,
    require:true
  },
  endTime:{
    type:String,
    require:true
  }

},
 { timestamps: true }
);

module.exports = mongoose.model('MarketItem', marketItemSchema);
