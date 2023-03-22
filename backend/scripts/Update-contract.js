const { ethers } = require("hardhat");

async function main() {
  const contractAddress = "0x9D53e9253d8E4b5f244C62cf577c0C0D2462f674"; // replace with the address of the deployed contract
  const updatedContractFactory = await ethers.getContractFactory("ApexNFTCard");
  const updatedContractInstance = await updatedContractFactory.attach(contractAddress).connect(hre.ethers.provider);
  // interact with the updated contract instance as needed
    // add code to check if update is successful
    const isSuccessful = true; // replace with your own check
    if (isSuccessful) {
      console.log("Contract update successful!");
    }else{
      console.log("Contract update faild!");
    }
}

main().then(() => process.exit(0)).catch(error => {
  console.error(error);
  process.exit(1);
});
