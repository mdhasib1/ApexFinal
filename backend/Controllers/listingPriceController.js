const { ethers } = require("ethers");
const asyncHandeler = require("express-async-handler")
const ApexNFTCard = require("./ABI/ApexNFTCard.json");

const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
const contractAddress = "0x1234567890123456789012345678901234567890";
const contractAbi = ApexNFTCard.abi;
const contract = new ethers.Contract(contractAddress, contractAbi, provider);

const getListingPrice = asyncHandeler(async(req,res)=>{
  try {
    const tokenId = req.params.tokenId;

    // Call the 'listingPrice' function on the contract to get the price of the token
    const price = await contract.listingPrice(tokenId);

    res.json({ price });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports ={
  getListingPrice
}