require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
require("@nomicfoundation/hardhat-chai-matchers");


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  etherscan: {
    apiKey: "7WDYAFTWXGQIWKIG71NQYVNR9ZQCAPE4DF"
  },
  networks: {
    mainnet: {
      url: 'https://mainnet.infura.io/v3/3388f5e77703443393a820b81bbb053a',
      gasPrice: 30e9,
      chainId: 1,
           accounts:{
            mnemonic : 'person rack blouse trouble hockey pluck depart guard aim crime catalog since'
           }
    },
  },
};





