import { ethers } from "ethers";

// Load web3 provider, this could either be from a browser with MetaMask or from a local node
export async function loadWeb3() {
  if (window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await window.ethereum.enable();
    return provider;
  } else {
    throw new Error("Please install MetaMask or set up a local node to use this app.");
  }
}

export async function getContractInstance(abi, contractAddress) {
  const web3 = await loadWeb3();
  const signer = web3.getSigner();
  const contract = new ethers.Contract(contractAddress, abi, signer);
  return contract;
}
