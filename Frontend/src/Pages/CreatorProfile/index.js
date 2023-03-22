import axios from "axios";
import { ethers } from "ethers";
import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { FiCamera } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { dragon, gif1, gif2, gif3, gif4, gif5, item1, item2, item3, item4, item5, prodToCard, single } from '../../Components/imageImport/index';

const CreateProfile = () => {
  const navigate = useNavigate()
  const [nfts, setNFT] = useState({});
  

  const [abi,setAbi] = useState([])
  const [address,setAddress] = useState('')
  const contractAddress = '0x3d242326441D640278a163A4169F4F1Ef6569FE4'
  useEffect(()=>{
    axios.get('http://localhost:8000/api/abi')
    .then((response)=>{
      setAbi(response.data.abi)
    })
  })

  // Request the user's wallet address from their extension wallet
async function getWalletAddress() {
  if (window.ethereum) {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    return address;
  } else {
    throw new Error('No Ethereum wallet found');
  }
}

// Usage
getWalletAddress()
  .then(address => setAddress(address))
  .catch(error => console.error(error));
  useEffect((address) => {
    const getNFT = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        abi,
        signer
      );

      const ownedNFTs = await contract.getOwnedNFTs(address);

      console.log(contract)

      // Assume we want to display the first NFT in the array
      const tokenId = ownedNFTs[0];

      const [
        nftName,
        nftDescription,
        nftAuthor,
        nftCollection,
        nftPrice,
      ] = await Promise.all([
        contract.name(tokenId),
        contract.description(tokenId),
        contract.author(tokenId),
        contract.nftcollection(tokenId),
        contract.getApproved(tokenId).then((approvedAddress) =>
          approvedAddress === contract.address ? "For Sale" : "Not For Sale"
        ),
      ]);

      setNFT({
        name: nftName,
        description: nftDescription,
        author: nftAuthor,
        collection: nftCollection,
        price: nftPrice,
      });
    };

    if (window.ethereum) {
      getNFT();
    }
  }, []);

  const onSaleData = [
    {
      image: gif1,
      title: 'Deep Sea Phantasy',
      type: 'GIFs',
      id: 'May 29, 2022 6:0:0'
    },
    {
      image: item1,
      title: 'CyberPrimal 042 LAN',
      type: 'Arts',
      id: ''
    },
    {
      image: gif2,
      title: 'Crypto Egg Stamp #5',
      type: 'Games',
      id: ''
    },
  ]



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
    {
      title: 'Our Journey Start',
      author: 'CalvinCarlo',
      time: '5 hours ago',
      favorite: 'Listed by',
      image: item3,
    },
    {
      title: 'BitBears',
      author: 'ButterFly',
      time: '8 hours ago',
      favorite: 'Liked by',
      image: gif2,
    },
    {
      title: 'Little Kokeshi #13',
      author: 'ButterFly',
      time: '10 hours ago',
      favorite: 'Liked by',
      image: item4,
    },
    {
      title: 'EVOL Floater',
      author: 'CutieGirl',
      time: '13 hours ago',
      favorite: 'Started Following',
      image: gif3,
    },
    {
      title: 'Smart Ape Club (SAC) - Limited Edition',
      author: 'CalvinCarlo',
      time: '18 hours ago',
      favorite: 'Listed by',
      image: gif4,
    },
    {
      title: 'THE SECRET SOCIETY XX #775',
      author: 'CalvinCarlo',
      time: '23 hours ago',
      favorite: 'Listed by',
      image: gif5,
    },
    {
      title: 'Create Your Own World',
      author: 'ButterFly',
      time: '24 hours ago',
      favorite: 'Liked by',
      image: item5,
    },
  ]

  const loadFile = function (event) {
    var image = document.getElementById(event.target.name)
    image.src = URL.createObjectURL(event.target.files[0])
  }

  return (
    <>

      {/* Start Home */}
      <section className="bg-creator-profile">
        <div className="container">
          <div className="profile-banner">
            <input
              id="pro-banner"
              name="profile-banner"
              type="file"
              className="d-none"
              onChange={e => loadFile(e)}
            />
            <div className="position-relative d-inline-block">
              <img
                src={single}
                className="rounded-md shadow-sm img-fluid"
                id="profile-banner"
                alt=""
              />
              <label
                className="icons position-absolute bottom-0 end-0"
                htmlFor="pro-banner"
              >
                <span className="btn btn-icon btn-sm btn-pills btn-primary">
                  <FiCamera className="icons" />
                </span>
              </label>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col">
              <div className="text-center mt-n80">
                <div className="profile-pic">
                  <input
                    id="pro-img"
                    name="profile-image"
                    type="file"
                    className="d-none"
                    onChange={e => loadFile(e)}
                  />
                  <div className="position-relative d-inline-block">
                    <img
                      src={dragon}
                      className="avatar avatar-medium img-thumbnail rounded-pill shadow-sm"
                      id="profile-image"
                      alt=""
                    />
                    <label
                      className="icons position-absolute bottom-0 end-0"
                      htmlFor="pro-img"
                    >
                      <span className="btn btn-icon btn-sm btn-pills btn-primary">
                        <FiCamera className="icons" />
                      </span>
                    </label>
                  </div>
                </div>

                <div className="content mt-3">
                  <h5 className="mb-3 text-light">MD HASIB</h5>

                  <div className="mt-4">
                    <a
                      href="/creator-profile-edit"
                      onClick={e => {
                        e.preventDefault()
                        navigate('/creator-profile-edit')
                      }}
                      className="btn btn-pills btn-outline-primary mx-1"
                    >
                      Edit Profile
                    </a>
        
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mt-100 mt-60">
          <div className="row">
            <div className="col-12">
              <ul
                className="nav nav-tabs border-bottom"
                id="myTab"
                role="tablist"
              >
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="Create-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#CreateItem"
                    type="button"
                    role="tab"
                    aria-controls="CreateItem"
                    aria-selected="true"
                  >
                    Created
                  </button>
                </li>


                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="Sale-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#Sale"
                    type="button"
                    role="tab"
                    aria-controls="Sale"
                    aria-selected="false"
                  >
                    On Sale
                  </button>
                </li>

                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="Collection-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#Collection"
                    type="button"
                    role="tab"
                    aria-controls="Collection"
                    aria-selected="false"
                  >
                    Collection
                  </button>
                </li>


                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="About-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#About"
                    type="button"
                    role="tab"
                    aria-controls="About"
                    aria-selected="false"
                  >
                    About
                  </button>
                </li>
              </ul>

              <div className="tab-content mt-4 pt-2" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="CreateItem"
                  role="tabpanel"
                  aria-labelledby="Create-tab"
                >
                  {/* if value select created */}
                  <Row className="mt-4">
        {nfts.length > 0 ? (
          nfts.map((result) => (
            <Col xs={12} md={6} lg={3} key={result.id} className="mb-4  p-3">
              <Card className='nftcard'>
                <Card.Img variant="top" className='py-3 px-2' height={250} src={result.image} />
                <Card.Body>
                  <Card.Title>{result.name}</Card.Title>
                  <Card.Text>{result.description}</Card.Text>
                  <div className="d-flex justify-content-between align-items-center">
                    <small>{result.creator}</small>
                    <small>{result.price} ETH</small>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <p>No results found.</p>
          </Col>
        )}
      </Row>
                </div>
                <div
                  className="tab-pane fade"
                  id="Sale"
                  role="tabpanel"
                  aria-labelledby="Sale-tab"
                >
                 <Row className="mt-4">
        {nfts.length > 0 ? (
          nfts.map((result) => (
            <Col xs={12} md={6} lg={3} key={result.id} className="mb-4  p-3">
              <Card className='nftcard'>
                <Card.Img variant="top" className='py-3 px-2' height={250} src={result.image} />
                <Card.Body>
                  <Card.Title>{result.name}</Card.Title>
                  <Card.Text>{result.description}</Card.Text>
                  <div className="d-flex justify-content-between align-items-center">
                    <small>{result.creator}</small>
                    <small>{result.price} ETH</small>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <p>No results found.</p>
          </Col>
        )}
      </Row>
                  {/*end row*/}
                </div>
                {/* if value select collection */}
                <div
                  className="tab-pane fade "
                  id="Collection"
                  role="tabpanel"
                  aria-labelledby="Collection-tab"
                >
                  <div className="row justify-content-center">
                    
                    <div className="col-lg-5 col-md-8 text-center">
                      <img src={prodToCard} className="img-fluid" alt="" />

                      <div className="content mt-4">
                        <h5 className="mb-4">No Collection</h5>
                        <p className="text-muted">
                          Save interesting shots into personalized collections,
                          and discover new and interesting recommendations along
                          the way.
                        </p>
                      </div>
                    </div>
                    {/*end col*/}
                  </div>
                  {/*end row*/}
                </div>
                {/* if value select follower */}
                <div
                  className="tab-pane fade"
                  id="Followers"
                  role="tabpanel"
                  aria-labelledby="Followers-tab"
                >

                </div>
                <div
                  className="tab-pane fade"
                  id="About"
                  role="tabpanel"
                  aria-labelledby="About-tab"
                >
                  <h5 className="mb-4 text-light">Calvin Carlo</h5>

                  <p className="text-light mb-0">
                    I have started my career as a trainee and prove my self and
                    achieve all the milestone with good guidance and reach up to
                    the project manager. In this journey, I understand all the
                    procedure which make me a good developer, team leader, and a
                    project manager.
                  </p>
                </div>
              </div>
            </div>
            {/*end col*/}
          </div>
          {/*end row*/}
        </div>
        {/*end container*/}
      </section>
      {/*end section*/}

    </>
  )
}

export default CreateProfile
