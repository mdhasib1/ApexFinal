import axios from 'axios'
import { ethers } from 'ethers'
import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import LoadingScreen from "react-loading-screen"
import { Link, useNavigate, useParams } from 'react-router-dom'
import Web3Modal from 'web3modal'
import { client01, client02, client03, client08, client09, client10, dragon, gif1, gif2, item1, item2 } from '../../Components/imageImport/index'
import { shortenAddress } from '../../utils/shortenAddress'



const ETH_TO_USD_API_URL = 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd';


const DetailsNFT = () => {
  const { tokenId } = useParams();
  const [nft, setNft] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [author, setAuthor] = useState('');
  const [bidPrice , setPlacePrice] = useState('')


  useEffect(() => {
    setIsLoading(true);
    

    axios.get(`http://localhost:8000/api/nfts/${tokenId}`)
      .then((response) => {
        if (response.data.success === true) {
          setNft(response.data.nft);
          setIsLoading(false);
        }
      });
  }, [tokenId]);

  const [gasLimit, setGasLimit] = useState(null);
const apiKey = 'RICHI4EG2D7RE4CDIKZ5GD6RNR6YWQW32V';
const gasPrice = '2000000000'; // 2 gwei in wei
const apiUrl = `https://api-goerli.etherscan.io/api?module=gastracker&action=gasestimate&gasprice=${gasPrice}&apikey=${apiKey}`;

useEffect(() => {
  axios.get(apiUrl)
    .then(response => {
      setGasLimit(response.data.result.SafeGasPrice);
    })
    .catch(error => {
      console.error(error);
    });
}, [apiUrl]);


  const handleBuyNFT = async () => {
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      if (accounts.length === 0) {
        // User is not connected with MetaMask
        console.log("User is not connected with MetaMask");
        return;
      }
  
      setShowModal(true);
    } catch (err) {
      console.log(err);
    }
  };

  const [abi,setAbi] = useState([])
  const contractAddress = '0x3d242326441D640278a163A4169F4F1Ef6569FE4'
  useEffect(()=>{
    axios.get('http://localhost:8000/api/abi')
    .then((response)=>{
      setAbi(response.data.abi)
    })
  })



const navigate = useNavigate()

const [ethToUsdRate, setEthToUsdRate] = useState(null);

useEffect(() => {
  const fetchData = async () => {
    const maxRetries = 5;
    let retryCount = 0;
    while (retryCount < maxRetries) {
      try {
        const response = await axios.get(ETH_TO_USD_API_URL);
        setEthToUsdRate(response.data.ethereum.usd);
        break; // stop retrying if successful response is received
      } catch (error) {
        console.error(error);
        retryCount++;
        const waitTime = retryCount * 2000; // increase wait time with each retry
        console.log(`Retrying after ${waitTime} ms...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
    }
  };

  fetchData();
}, []);

if (ethToUsdRate === null) {
  return <p>Loading...</p>;
}

const usdPrice = Number(nft?.price) * ethToUsdRate;


const  createBid = async (e) => {
  const web3Modal = new Web3Modal();
  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, abi, signer);

  const overrides = {
    value: ethers.utils.parseEther(bidPrice.toString())
  };

  return contract.createBid(tokenId, overrides)
    .then((tx) => {
      console.log(tx);
      // Save bid data to MongoDB database
      const data = { tokenId, bidPrice, bidder: signer.getAddress(), transactionHash: tx.hash };
    })
    .catch((error) => {
      console.error(error);
    });
}






 // Function for handling the buy NFT button click event

 const handleBuyNow = async (e, gasLimit) => {
  e.preventDefault();
  const web3Modal = new Web3Modal();
  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, abi, signer);

  try {
    const accounts = await provider.listAccounts();
    const price = ethers.utils.parseUnits(nft?.price.toString(), "ether");
    const gasPrice = await provider.getGasPrice();
    const tx = await contract.buyMarketItem(nft?.tokenId, {
      value: price,
      gasPrice,
      gasLimit: gasLimit || 200000, // <-- set a fixed gas limit value here or pass it as a parameter
    });
    const receipt = await tx.wait();

    if (receipt.status === 0) {
      console.error("Transaction failed.");
      console.log(receipt);
      return;
    }

    try {
      setIsLoading(true);
      // Call the backend to update the NFT data
      const response = await axios.put(
        `http://localhost:8000/api/nfts/${tokenId}`,
        {
          sold: true,
          buyer: accounts[0],
        }
      );

      if (response.data.success === true) {
        console.log("NFT purchased successfully!");
        setNft({
          ...nft,
          sold: true,
          buyer: accounts[0],
        });
      } else {
        console.error("Failed to update NFT data on the backend.");
      }
    } catch (error) {
      console.error("Failed to update NFT data on the backend.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  } catch (error) {
    console.error("Failed to purchase NFT." + error);
  }
};




















  
  






  
  const activityData = [
    {
      title: 'Digital Art Collection',
      author: 'Panda',
      time: '1 hours ago',
      favorite: 'Started Following',
      image: item1,
    },
    {
      title: 'Skrrt Cobain Official',
      author: 'ButterFly',
      time: '2 hours ago',
      favorite: 'Liked by',
      image: gif1,
    },
    {
      title: 'Wow! That Brain Is Floating',
      author: 'ButterFly',
      time: '2 hours ago',
      favorite: 'Liked by',
      image: item2,
    },
  ]
  const createdData = [
    {
      image: gif1,
      title: 'Deep Sea Phantasy',
      id: 'May 29, 2022 6:0:0',
      type: 'GIFs',
      client: client01,
      author: 'StreetBoy',
    },
    {
      image: item1,
      title: 'CyberPrimal 042 LAN',
      id: 'June 03, 2022 5:3:1',
      type: 'Arts',
      client: client09,
      author: 'PandaOne',
    },
    {
      image: gif2,
      title: 'Crypto Egg Stamp #5',
      id: 'June 10, 2022 1:0:1',
      type: 'GIFs',
      client: client02,
      author: 'CutieGirl',
    },
    {
      image: item2,
      title: 'Colorful Abstract Painting',
      id: 'June 18, 2022 1:2:1',
      type: 'Memes',
      client: client03,
      author: 'NorseQueen',
    },
  ]
  return (
    <LoadingScreen
    loading={isLoading}
    bgColor="linear-gradient(
    1550deg,
    #8000ff,
    #18014a,
    #39035a
  ) !important"
    spinnerColor="#9ee5f8"
    textColor="#676767"
    logoSrc={dragon}
  >
      {/* Start */}
      <section className="bg-item-detail">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="sticky-bar ">
                <img
                  src={nft?.image}
                  className="img-fluid rounded-md shadow"
                  alt=""
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="ms-lg-5">
                <div className="title-heading">
                  <h4 className="h2 fw-bold mb-0 text-light">
                    {nft?.name}
                  </h4>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <h6>Current Bid</h6>
                    <h4 className="mb-0 text-light">{nft?.price} Eth</h4>
                    <small className="mb-0 text-light">{`$${usdPrice.toFixed(2)}`}</small>
                  </div>


                  <div className="col-12 mt-4 pt-2">
          
                    {nft?.seller === author ? (
                <h5>This nft You already owner</h5>
            
                    ):(
                   <>
                      <Link
                      className="btn btn-l btn-pills btn-primary me-2"
                      data-bs-toggle="modal"
                      data-bs-target="#NftBid"
                    >
                      <i className="mdi mdi-gavel fs-5 me-2"></i> Place a Bid
                    </Link>
                      <Link
                      className="btn btn-l btn-pills btn-primary"
                      onClick={handleBuyNFT}
                    >
                      <i className="mdi mdi-cart fs-5 me-2"></i> Buy Now
                    </Link>
                   </>
                    )}
                  
                  </div>
                </div>

                <div className="row mt-4 pt-2">
                  <div className="col-12">
                    <ul
                      className="nav nav-tabs border-bottom"
                      id="myTab"
                      role="tablist"
                    >
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link active"
                          id="detail-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#detailItem"
                          type="button"
                          role="tab"
                          aria-controls="detailItem"
                          aria-selected="true"
                        >
                          Details
                        </button>
                      </li>

                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="bids-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#bids"
                          type="button"
                          role="tab"
                          aria-controls="bids"
                          aria-selected="false"
                        >
                          Bids
                        </button>
                      </li>

                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="activity-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#activity"
                          type="button"
                          role="tab"
                          aria-controls="activity"
                          aria-selected="false"
                        >
                          Activity
                        </button>
                      </li>
                    </ul>

                    <div className="tab-content mt-4 pt-2" id="myTabContent">
                      <div
                        className="tab-pane fade show active"
                        id="detailItem"
                        role="tabpanel"
                        aria-labelledby="detail-tab"
                      >
                        <p className="text-muted">
                        {nft?.description}
                        </p>
        
                        <h6>Owner</h6>

                        <div className="creators creator-primary d-flex align-items-center">
                          <div className="position-relative">
                            <img
                              src={client09}
                              className="avatar avatar-md-sm shadow-md rounded-pill"
                              alt=""
                            />
                            <span className="verified text-primary">
                              <i className="mdi mdi-check-decagram"></i>
                            </span>
                          </div>

                          <div className="ms-3">
                            <h6 className="mb-0">
                              <Link
                                to="/creators"
                                onClick={e => {
                                  e.preventDefault()
                                  navigate('/creators')
                                }}
                                className="text-dark name"
                              >
                              {shortenAddress(nft?.owner)}
                              </Link>
                            </h6>
                          </div>
                        </div>
                      </div>

                      <div
                        className="tab-pane fade"
                        id="bids"
                        role="tabpanel"
                        aria-labelledby="bids-tab"
                      >
                        <div className="creators creator-primary d-flex align-items-center">
                          <div className="position-relative">
                            <img
                              src={client01}
                              className="avatar avatar-md-sm shadow-md rounded-pill"
                              alt=""
                            />
                          </div>

                          <div className="ms-3">
                            <h6 className="mb-0">
                              2 WETH <span className="text-muted">by</span>{' '}
                              <Link
                                to="/creator-profile"
                                onClick={e => {
                                  e.preventDefault()
                                  navigate('/creator-profile')
                                }}
                                className="text-dark name"
                              >
                                0xe849fa28a...ea14
                              </Link>
                            </h6>
                            <small className="text-muted">6 hours ago</small>
                          </div>
                        </div>

                        <div className="creators creator-primary d-flex align-items-center mt-4">
                          <div className="position-relative">
                            <img
                              src={client08}
                              className="avatar avatar-md-sm shadow-md rounded-pill"
                              alt=""
                            />
                          </div>

                          <div className="ms-3">
                            <h6 className="mb-0">
                              0.001 WETH <span className="text-muted">by</span>{' '}
                              <Link
                                to="/creator-profile"
                                onClick={e => {
                                  e.preventDefault()
                                  navigate('/creator-profile')
                                }}
                                className="text-dark name"
                              >
                                VOTwear
                              </Link>
                            </h6>
                            <small className="text-muted">6 hours ago</small>
                          </div>
                        </div>

                        <div className="creators creator-primary d-flex align-items-center mt-4">
                          <div className="position-relative">
                            <img
                              src={client10}
                              className="avatar avatar-md-sm shadow-md rounded-pill"
                              alt=""
                            />
                          </div>

                          <div className="ms-3">
                            <h6 className="mb-0">
                              1.225 WETH <span className="text-muted">by</span>{' '}
                              <Link
                                to="/creator-profile"
                                onClick={e => {
                                  e.preventDefault()
                                  navigate('/creator-profile')
                                }}
                                className="text-dark name"
                              >
                                PandaOne
                              </Link>
                            </h6>
                            <small className="text-muted">6 hours ago</small>
                          </div>
                        </div>
                      </div>

                      <div
                        className="tab-pane fade"
                        id="activity"
                        role="tabpanel"
                        aria-labelledby="activity-tab"
                      >
                        <div className="row g-4">
                          {activityData?.map(data => {
                            return (
                              <div className="col-12" key={data?.title}>
                                <div className="card activity activity-primary rounded-md shadow p-4">
                                  <div className="d-flex align-items-center">
                                    <div className="position-relative">
                                      <img
                                        src={data?.image}
                                        className="avatar avatar-md-md rounded-md shadow-md"
                                        alt=""
                                      />

                                      <div className="position-absolute top-0 start-0 translate-middle px-1 rounded-lg shadow-md bg-white">
                                        {data?.favorite ===
                                          'Started Following' ? (
                                          <i className="mdi mdi-account-check mdi-18px text-success"></i>
                                        ) : data?.favorite === 'Liked by' ? (
                                          <i className="mdi mdi-heart mdi-18px text-danger"></i>
                                        ) : (
                                          <i className="mdi mdi-format-list-bulleted mdi-18px text-warning"></i>
                                        )}
                                      </div>
                                    </div>
                                    <span className="content ms-3">
                                      <Link
                                        onClick={e => e.preventDefault()}
                                        className="text-dark title mb-0 h6 d-block"
                                      >
                                        {data?.time}
                                      </Link>
                                      <small className="text-muted d-block mt-1">
                                        {data?.favorite}{' '}
                                        <Link
                                          onClick={e => e.preventDefault()}
                                          className="link fw-bold"
                                        >
                                          @{data?.author}
                                        </Link>
                                      </small>

                                      <small className="text-muted d-block mt-1">
                                        {data?.time}
                                      </small>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            )
                          })}
                          {/*end col*/}
                        </div>
                        {/*end row*/}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*end col*/}
          </div>
          {/*end row*/}
        </div>
        {/*end container*/}

        <div className="container mt-100 mt-60">
          <div className="row justify-content-center">
            <div className="col">
              <div className="section-title text-center mb-4 pb-2">
                <h4 className="title mb-4">Related Auction Items</h4>
                <p className="text-muted para-desc mb-0 mx-auto">
                  We are a huge marketplace dedicated to connecting great
                  artists of all Superex with their fans and unique token
                  collectors!
                </p>
              </div>
            </div>
            {/*end col*/}
          </div>
          {/*end row*/}

          <div className="row row-cols-xl-4 row-cols-lg-3 row-cols-sm-2 row-cols-1">
            {createdData?.map(data => {
              return (
                <div className="col mt-4 pt-2" key={data?.title}>
                  <div className="card nft-items nft-primary nft-auction rounded-md shadow overflow-hidden mb-1 p-3">
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center">
                        <img
                          src={data?.client}
                          alt="user"
                          className="avatar avatar-sm-sm img-thumbnail border-0 shadow-sm rounded-circle"
                        />
                        <Link
                          onClick={e => e.preventDefault()}
                          className="text-dark small creator-name h6 mb-0 ms-2"
                        >
                          @{data?.author}
                        </Link>
                      </div>
                    </div>

                    <div className="nft-image rounded-md mt-3 position-relative overflow-hidden">
                      <Link
                        to="/item-detail-one"
                        onClick={e => {
                          e.preventDefault()
                          navigate('/item-detail-one')
                        }}
                      >
                        <img src={data?.image} className="img-fluid" alt="" />
                      </Link>
                      <div className="position-absolute top-0 start-0 m-2">
                        <Link
                          onClick={e => e.preventDefault()}
                          className="badge badge-link bg-primary"
                        >
                          {data?.type}
                        </Link>
                      </div>
                      <div className="position-absolute top-0 end-0 m-2">
                        <span className="like-icon shadow-sm">
                          <Link
                            onClick={e => e.preventDefault()}
                            className="text-muted icon"
                          >
                            <i className="mdi mdi-18px mdi-heart mb-0"></i>
                          </Link>
                        </span>
                      </div>

                    </div>

                    <div className="card-body content position-relative p-0 mt-3">
                      <Link
                        to="/item-detail-one"
                        onClick={e => {
                          e.preventDefault()
                          navigate('/item-detail-one')
                        }}
                        className="title text-dark h6"
                      >
                        {data?.title}
                      </Link>

                      <div className="d-flex align-items-center justify-content-between mt-3">
                        <div className="">
                          <small className="mb-0 d-block fw-semibold">
                            Current Bid:
                          </small>
                          <small className="rate fw-bold">20.5 ETH</small>
                        </div>
                        <Link
                          to="/item-detail-one"
                          onClick={e => {
                            e.preventDefault()
                            navigate('/item-detail-one')
                          }}
                          className="btn btn-icon btn-pills btn-primary"
                        >
                          <i className="uil uil-shopping-bag"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
            {/*end col*/}
          </div>
          {/*end row*/}
        </div>
        {/*end container*/}
      </section>
      {/*end section*/}
      {/* End */}

      {/* Place Bid Modal */}
      <div
        className="modal fade"
        id="NftBid"
        aria-hidden="true"
        aria-labelledby="bidtitle"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered modal-sm">
          <div className="modal-content border-0 shadow-md rounded-md">
            <div className="modal-header">
              <h5 className="modal-title" id="bidtitle">
                Place a Bid
              </h5>
              <button
                type="button"
                className="btn btn-close"
                data-bs-dismiss="modal"
                id="close-modal"
              >
                <i className="uil uil-times fs-4"></i>
              </button>
            </div>
            <div className="modal-body p-4">
              <form onSubmit={createBid}>
                <div className="row">
                  <div className="col-12">
                    <div className="mb-4">
                      <label className="form-label fw-bold">
                        Your Bid Price <span className="text-danger">*</span>
                      </label>
                      <input
                        name="name"
                        id="name"
                        type="text"
                        className="form-control"
                        onChange={(e)=> setPlacePrice(e.target.value)}
                        placeholder="00.00 ETH"
                      />
                    </div>
                  </div>
                  {/*end col*/}
                </div>
                <div className="modal-footer">
              <button
                className="btn btn-pills btn-primary"
                data-bs-target="#placebid"
                data-bs-toggle="modal"
              >
                <i className="mdi mdi-gavel fs-5 me-2"></i> Place a Bid
              </button>
            </div>
              </form>
            </div>
   
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="placebid"
        aria-hidden="true"
        aria-labelledby="bidsuccess"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered modal-sm">
          <div className="modal-content border-0 shadow-md rounded-md">
            <div className="modal-header">
              <h5 className="modal-title" id="bidsuccess">
                Bidding Successful
              </h5>
              <button
                type="button"
                className="btn btn-close"
                data-bs-dismiss="modal"
                id="close-modal"
              >
                <i className="uil uil-times fs-4"></i>
              </button>
            </div>
            <div className="modal-body p-4">
              your bid (1.27ETH) has been listing to our database
            </div>
            <div className="modal-footer">
              <Link
                to="/activity"
                onClick={e => {
                  e.preventDefault()
                  navigate('/activity')
                }}
                data-bs-toggle="modal"
                className="btn btn-pills btn-primary"
              >
                <i className="mdi mdi-basket-plus fs-5 me-2"></i> View Your Bid
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Place Bid Modal */}

 <Modal show={showModal}>
        <Modal.Header closeButton>
          <Modal.Title>Checkout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={handleBuyNow}>
                 <div className="row">
                   <div className="col-12">
                     <div className="mb-4">
                       <label className="form-label fw-bold">
                         Your Price <span className="text-danger">*</span>
                       </label>
                       <input
                         name="name"
                         id="name"
                         type="text"
                         className="form-control text-dark"
                         defaultValue={nft?.price.toString()}
                         required
                       />
                     </div>
                   </div>
                   {/*end col*/}
                 </div>
                 <div className="bg-soft-danger p-3 rounded shadow">
                 <div className="d-flex align-items-center">
                   <i className="uil uil-exclamation-circle h2 mb-0 me-2"></i>
                   <div className="flex-1">
                     <small className="mb-0">
                       Purchase this item at your own risk
                     </small>
                   </div>
                 </div>
               </div>
                 <button
                   className="btn btn-pills btn-primary w-100"
                  //  data-bs-target="#buyNftSuccess"
                  //  data-bs-toggle="modal"
                   type='onsubmit'
                 >
                   <i className="mdi mdi-cart fs-5 me-2"></i> Continue
                 </button>
               </form>
        </Modal.Body>

      </Modal>
      {/* Buy Now NFt Modal */}

     
      <div
        className="modal fade"
        id="buyNftSuccess"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel2"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered modal-sm">
          <div className="modal-content border-0 shadow-md rounded-md">
            <div className="position-absolute top-0 start-100 translate-middle z-index-1">
              <button
                type="button"
                className="btn btn-icon btn-pills btn-sm btn-light btn-close opacity-10"
                data-bs-dismiss="modal"
                id="close-modal"
              >
                <i className="uil uil-times fs-4"></i>
              </button>
            </div>
            <div className="modal-body text-center p-4">
              <h3>Yahhhoooo! 🎉</h3>
              <h6 className="text-muted mb-0">
                You successfully purchased{' '}
                <Link className="text-reset">
                  <u>XYZ nft</u>
                </Link>{' '}
                from Superex
              </h6>

              <ul className="rounded-md shadow p-4 border list-unstyled mt-4">
                <li className="d-flex justify-content-between">
                  <span className="fw-bold me-5">Status:</span>
                  <span className="text-warning">Processing</span>
                </li>

                <li className="d-flex justify-content-between mt-2">
                  <span className="fw-bold me-5">Transaction ID:</span>
                  <span className="text-muted">qhut0...hfteh45</span>
                </li>
              </ul>

              <ul className="list-unstyled social-icon mb-0 mt-4">
                {[
                  'uil uil-facebook-f',
                  'uil uil-instagram',
                  'uil uil-linkedin',
                  'uil uil-dribbble',
                  'uil uil-twitter',
                ]?.map((data, index) => {
                  return (
                    <li className="list-inline-item lh-1 mr-1" key={index}>
                      <Link className="rounded">
                        <i className={data}></i>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* Buy Now NFt Modal */}

  
      </LoadingScreen>
  )
}

export default DetailsNFT;
