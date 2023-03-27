import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const WalletModal = ({ show, handleClose }) => {
  const [provider, setProvider] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (window.ethereum) {
      const newProvider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(newProvider);
    }
  }, []);

  const connectMetamaskWallet = async () => {
    if (window.ethereum) {
      await window.ethereum.enable();
      setProvider(new ethers.providers.Web3Provider(window.ethereum));
      handleWalletConnection(openWalletExtension);
    }
  };

  const connectTrustWallet = async () => {
    if (window.ethereum) {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x1",
            chainName: "Ethereum Mainnet",
            nativeCurrency: {
              name: "Ether",
              symbol: "ETH",
              decimals: 18,
            },
            rpcUrls: [
              "https://mainnet.infura.io/v3/328c761f6ce4486284406a50a6a5c116",
            ],
          },
        ],
      });
      setProvider(new ethers.providers.Web3Provider(window.ethereum));
      handleWalletConnection(openWalletExtension);
    }
  };

  const openWalletExtension = async () => {
    if (window.ethereum) {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const newProvider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(newProvider);
  
      // Request signing a message
      const signer = newProvider.getSigner();
      const address = await signer.getAddress();
      const message = `Sign this message to login to DragonShareNFT: ${Math.random()}`;
      await signer.signMessage(message);

  
      return address;
    }
  };
  

  const checkUserAddress = async (address) => {
    try {
      const response = await fetch(`http://localhost:8000/api/users/check/${address}`);
      const data = await response.json();

      return data.addressExists;
    } catch (error) {
      console.error("Error checking user address:", error);
      return false;
    }
  };
  
  const handleWalletConnection = async (connectionFunc) => {
    try {
      const address = await connectionFunc();

      console.log(address)
  
      if (address) {
        const userExists = await checkUserAddress(address);
  
        if (userExists) {
          navigate("/lock-screen",{ state: { address } });
        } else {
          navigate("/profile-setup", { state: { address } });
        }
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  const handleCloseModal = () => {
    handleClose();
    setProvider(null);
  };

  const renderWalletOptions = () => {
    return (
      <div>
        {window.ethereum ? (
          <div className="container">
            <div className="row m-auto ">
              <div className="col-lg-6 col-md-12 col-sm-12">
                <button
                  onClick={() => handleWalletConnection(openWalletExtension)}
                >
                  <img
                    className="bg-dark p-3"
                    width={150}
                    src="./Images/metamask-icon.png"
                    alt="metamask"
                  />
                </button>
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12">
                <button
                  onClick={() => handleWalletConnection(openWalletExtension)}
                >
                  <img
                    className="bg-dark p-3"
                    width={150}
                    src="./Images/TWT.png"
                    alt="trustwallet"
                  />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <button
              onClick={() => handleWalletConnection(connectMetamaskWallet)}
            >
              Connect MetaMask
            </button>
            <button onClick={() => handleWalletConnection(connectTrustWallet)}>
              Connect Trust Wallet
            </button>
          </>
        )}
      </div>
    );
  };

  const renderConnectedWallet = () => {
    return (
      <div>
        <p>Connected with {provider.connection.url}</p>
        <button onClick={handleCloseModal}>Close</button>
      </div>
    );
  };

  const renderWalletNotFound = () => {
    return (
      <div>
        <p>
          No Ethereum wallet found. Please install MetaMask or Trust Wallet to
          use this feature.
        </p>
        <Button>
          <Link className="text-light" to="https://metamask.io/download/">
            Install Now
          </Link>
        </Button>
      </div>
    );
  };

  return (
    <Modal
      size="md"
      className="text-light"
      show={show}
      onHide={handleClose}
      centered
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton className=" bg-dark text-light">
        <Modal.Title id="contained-modal-title-vcenter text-light">
          Connect to a Wallet
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-5 bg-dark text-light">
        {provider
          ? renderConnectedWallet()
          : window.ethereum
          ? renderWalletOptions()
          : renderWalletNotFound()}
      </Modal.Body>
    </Modal>
  );
};

export default WalletModal;