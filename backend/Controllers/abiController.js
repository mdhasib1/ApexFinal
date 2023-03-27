const asyncHandeler =require('express-async-handler');
const ApexNFTCard =require('../ABI/ApexNFTCard.json');
const ABI = ApexNFTCard




const getAbi = asyncHandeler(async(req,res)=>{
  try {
    res.send(ABI);
  } catch (err) {
    // Handle any errors
    console.error(err);
    res.status(500).send('Error retrieving ABI data');
  }
});


module.exports={
  getAbi,
}
