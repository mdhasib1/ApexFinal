const { ethers } = require('ethers');

async function speedUpTransaction() {
  const txHash = '0x07441d2a422b241fc8030d7610f43f6d064fa174e9c1ae5a4a8e565dd7a2e853';
  const gasPrice = ethers.utils.parseUnits("20", "gwei");
  const provider = new ethers.providers.JsonRpcProvider("https://mainnet.infura.io/v3/cf7301d2d69940e0b6c0261803e5ca1a");
  console.log(provider)
  const privateKey = "4fd04136b143d577fca22f64a2c00519a03922824ad28e87f0cdd5535a469c97";
  const wallet = new ethers.Wallet(privateKey, provider);
  const tx = await provider.getTransaction(txHash);

  if (!tx) {
    console.log("Transaction not found or has already been confirmed.");
    return;
  }
  const newTx = {
    nonce: tx.nonce,
    gasPrice: gasPrice,
    to: tx.to,
    value: tx.value,
    data: tx.data,
    chainId: tx.chainId,
  };
  const signedTx = await wallet.signTransaction(newTx);
  const txResponse = await provider.sendTransaction(signedTx);
  console.log(`New transaction submitted with hash: ${txResponse.hash}`);
}

speedUpTransaction();
