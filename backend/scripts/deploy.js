const hre = require('hardhat');

async function main() {
  const ApexNFTCard = await hre.ethers.getContractFactory('ApexNFTCard');
  const apexNFTCard = await ApexNFTCard.deploy();
  await apexNFTCard.deployed();


  console.log(`'Contract deployed to:',${ apexNFTCard.address}`);
    // Verify contract on Etherscan
    await hre.run("verify:verify", {
      network: "mainnet",
      address: apexNFTCard.address,
      apiKey: '7WDYAFTWXGQIWKIG71NQYVNR9ZQCAPE4DF'
    });

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

