const MarketItem = require("../Models/nftModel");
const { create } = require("ipfs-http-client");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const Web3 = require("web3");
const ApexNFTCard = require("../ABI/ApexNFTCard.json");
const asyncHandler = require('express-async-handler');

const projectId = "2H86CXrteec2S99HTacyvXeWuWu";
const projectSecret = "4c73466ef71292c0c151dc95fcbe78a7";
const subdomainName = "dragonsharenft";

const endpointBasePath = `https://${subdomainName}.infura-ipfs.io/ipfs/`;

const authorization = `Basic ${Buffer.from(
  `${projectId}:${projectSecret}`
).toString("base64")}`;

const ipfs = create({
  url: "https://ipfs.infura.io:5001/api/v0",
  headers: {
    authorization,
  },   
});

const INFURA_PROJECT_ID = "9a5e384e4d8b4f988f732feef58ed3f7";
const contractAddress = "0x9D53e9253d8E4b5f244C62cf577c0C0D2462f674";
const contractAbi = ApexNFTCard.abi;

const web3 = new Web3(`https://goerli.infura.io/v3/${INFURA_PROJECT_ID}`);
const privateKey =
  "4ffa9413c1432ccaa517eb37ecc1e29af4ad6bc42fd017f5b18f0a52149c39a7";

const account = web3.eth.accounts.privateKeyToAccount(privateKey);

const contract = new web3.eth.Contract(contractAbi, contractAddress, { from: account.address });

const Filter = (req, file, cb) => {
  if (
    file.mimetype.includes("png") ||
    file.mimetype.includes("jpeg") ||
    file.mimetype.includes("jpg") ||
    file.mimetype.includes("gif") ||
    file.mimetype.includes("webp")
  ) {
    cb(null, true);
  } else {
    cb("Please upload only png, jpg, jpeg, or gif files.", false);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const fileName =
      file.fieldname + Date.now() + path.extname(file.originalname);
    cb(null, fileName);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: Filter,
}).single("image");

const createNFTs = async (req, res) => {

  console.log(req.body)
  try {
    const { tokenId, name, description, price, author, nftcollection, image, endTime, owner, seller,sold } = req.body;

    // Save NFT data to your database
    const marketItem = new MarketItem({
      tokenId,
      name,
      description,
      price,
      author,
      nftcollection,
      image,
      endTime,
      owner,
      sold,
      seller,
    });

    await marketItem.save();

       return res.json({
      success: true,
      message: 'NFT created and listed for sale',
      data: marketItem,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create NFT.' });
  }
};




const getNFTs = async (req, res) => {
  try {
    const nfts = await MarketItem.find({sold:false});
    res.status(200).json({ success: true, nfts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}
const getAuthor = async (req, res) => {
  try {
    const nfts = await MarketItem.find({sold:false});
    res.status(200).json({ success: true, nfts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}




const getNFTById = asyncHandler(async (req, res) => {
  try {
    const tokenId = req.params.tokenId;
    const nft = await MarketItem.findOne({ tokenId: tokenId });
    if (!nft) {
      return res.status(404).json({ success: false, message: 'NFT not found' });
    }
    return res.status(200).json({ success: true, nft });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

const updateNFTs = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    // Find market item in MongoDB
    const marketItem = await MarketItem.findById(id);
    if (!marketItem) {
      return res.status(404).json({ message: "Market item not found" });
    }
    // Check if market item is already sold
    if (marketItem.sold) {
      return res.status(400).json({ message: "Market item is already sold" });
    }

    // Update market item in MongoDB
    marketItem.tokenId = req.body.tokenId;
    marketItem.seller = req.body.seller;
    marketItem.owner = req.body.owner;
    marketItem.price = req.body.price;
    marketItem.sold = req.body.sold;
    marketItem.author = req.body.author;
    marketItem.nftcollection = req.body.nftcollection;
    marketItem.name = req.body.name;
    marketItem.description = req.body.description;

    const updatedMarketItem = await marketItem.save();

    // Send transaction to Ethereum network to update token price
    const updateTokenPriceTx = await contract.updateTokenPrice(
      marketItem.tokenId,
      marketItem.price
    );
    await updateTokenPriceTx.wait();

    res.json(updatedMarketItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

const deleteNFTs = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    // Find market item in MongoDB
    const marketItem = await MarketItem.findById(id);
    if (!marketItem) {
      return res.status(404).json({ message: "Market item not found" });
    }
    // Check if market item is already sold
    if (marketItem.sold) {
      return res.status(400).json({ message: "Market item is already sold" });
    }

    // Delete market item from MongoDB
    await marketItem.remove();

    // Send transaction to Ethereum network to burn token
    const burnTokenTx = await contract.burnToken(marketItem.tokenId);
    await burnTokenTx.wait();

    res.json({ message: "Market item deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const ownerPercentage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { ownerPercentage } = req.body;

  try {
    const marketItem = await MarketItem.findById(id);
    if (!marketItem) {
      return res.status(404).json({ message: "Market item not found" });
    }

    marketItem.ownerPercentage = ownerPercentage;
    await marketItem.save();

    res.json(marketItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const fetchMyNFTs = asyncHandler(async (req, res) => {
  try {
    const owner = req.params.owner;
    const myNFTs = await contract.getNFTsByOwner(owner);

    const itemsWithPrices = await Promise.all(
      myNFTs.map(async (tokenId) => {
        const item = await MarketItem.findOne({ tokenId });
        const price = await contract.listingPrice(tokenId);
        return { ...item._doc, price };
      })
    );

    res.json(itemsWithPrices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


const buyNFT = asyncHandler(async (req, res) => {
  const { tokenId } = req.params;
  const { sold, buyer } = req.body;

  try {
    // Assuming you have a MarketItem model with a 'tokenId' field
    const marketItem = await MarketItem.findOne({ tokenId });

    if (!marketItem) {
      return res.status(404).json({ error: "Market item not found" });
    }

    marketItem.set({
      owner: buyer,
      sold,
    });

    await marketItem.save();

    res.status(200).json({ message: "Market item updated successfully", success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


const listedNFTs = asyncHandler(async (req, res) => {
  try {
    const marketItems = await MarketItem.find({ sold: false });

    const itemsWithTokenData = await Promise.all(
      marketItems.map(async (item) => {
        const tokenData = await contract.getTokenData(item.tokenId);
        return { ...item.toJSON(), ...tokenData };
      })
    );

    res.json(itemsWithTokenData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const resale = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const marketItem = await MarketItem.findById(id);
    if (!marketItem) {
      return res.status(404).json({ message: "Market item not found" });
    }

    const { seller, owner, price, tokenId } = marketItem;

    const { value, currency } = req.body;
    if (value < price) {
      return res
        .status(400)
        .json({ message: "Resale price must be greater than original price" });
    }

    if (seller !== req.user || owner !== req.user) {
      return res
        .status(401)
        .json({ message: "You are not authorized to resell this item" });
    }

    // Send transaction to Ethereum network to update price and transfer ownership
    const resaleTx = await contract.resale(
      tokenId,
      ethers.utils.parseEther(value.toString()),
      currency
    );
    await resaleTx.wait();

    // Update market item in MongoDB
    marketItem.price = value;
    const updatedMarketItem = await marketItem.save();

    res.json(updatedMarketItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

const munfts = asyncHandler(async(req,res)=>{
  try {
    const address = req.params.address
    if(!web3.utils.isAddress(address)){
      return res.status(400).json({error : 'Inva'})
    }
  } catch (error) {
    
  }
})

const myNFTsCreated = asyncHandler(async (req, res) => {
  try {
    const marketItems = await MarketItem.find({ seller: req.user });

    const itemsWithTokenData = await Promise.all(
      marketItems.map(async (item) => {
        const tokenData = await contract.getTokenData(item.tokenId);
        return { ...item.toJSON(), ...tokenData };
      })
    );

    res.json(itemsWithTokenData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const placeBid = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { bidder, amount } = req.body;

  try {
    const marketItem = await MarketItem.findById(id);
    if (!marketItem) {
      return res.status(404).json({ message: "Market item not found" });
    }

    // Get current highest bid for market item
    const currentHighestBid =
      marketItem.bids.length > 0 ? marketItem.bids[0].amount : marketItem.price;

    if (amount <= currentHighestBid) {
      return res.status(400).json({
        message: `Bid amount must be greater than ${currentHighestBid}`,
      });
    }

    // Send transaction to Ethereum network to place bid
    const placeBidTx = await contract.placeBid(id, amount);
    await placeBidTx.wait();

    // Update market item with new bid
    marketItem.bids.unshift({ bidder, amount });
    await marketItem.save();

    res.json(marketItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

const withdrawBalance = asyncHandler(async (req, res) => {
  const { address } = req.body;

  try {
    // Send transaction to Ethereum network to withdraw balance
    const withdrawBalanceTx = await contract.withdrawBalance(address);
    await withdrawBalanceTx.wait();

    res.json({ message: "Balance withdrawn successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


const getTopAuthors = asyncHandler(async (req, res) => {
  const topAuthors = await MarketItem.aggregate([
    {
      $group: {
        _id: '$author',
        itemCount: { $sum: 1 },
      },
    },
    {
      $sort: { itemCount: -1 },
    },
    {
      $limit: 20,
    },
    {
      $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: 'address',
        as: 'user',
      },
    },
    {
      $unwind: '$user',
    },
    {
      $project: {
        _id: 0,
        authorAddress: '$_id',
        itemCount: 1,
        user: '$user',
      },
    },
  ]);

  res.json(topAuthors);
});



module.exports = {
  getNFTs,
  createNFTs,
  updateNFTs,
  deleteNFTs,
  ownerPercentage,
  fetchMyNFTs,
  buyNFT,
  listedNFTs,
  resale,
  myNFTsCreated,
  placeBid,
  withdrawBalance,
  upload,
  getNFTById,
  getAuthor,
  getTopAuthors

};
