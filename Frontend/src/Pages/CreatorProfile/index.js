import axios from "axios";
import { ethers } from "ethers";
import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { FiCamera } from 'react-icons/fi';
import { useDispatch } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { dragon, prodToCard, single } from '../../Components/imageImport/index';
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser';
import { SET_NAME, SET_USER } from "../../redux/features/auth/authSlice";
import { getUser } from "../../services/authService";
const CreateProfile = () => {
  useRedirectLoggedOutUser("/lock-screen");
  const navigate = useNavigate()
  const [nfts, setNFT] = useState({});
  const dispatch = useDispatch();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    setIsLoading(true);
    async function getUserData() {
      const data = await getUser();

      setProfile(data);
      setIsLoading(false);
      await dispatch(SET_USER(data));
      await dispatch(SET_NAME(data.name));
    }
    getUserData();
  }, [dispatch]);

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
                  <h5 className="mb-3 text-light">{profile?.name}</h5>

                  <div className="mt-4">
                    <Link
                      to="/creator-profile-edit"
                      onClick={e => {
                        e.preventDefault()
                        navigate('/creator-profile-edit')
                      }}
                      className="btn btn-pills btn-outline-primary mx-1"
                    >
                      Edit Profile
                    </Link>
        
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
                  <h5 className="mb-4 text-light">{profile?.name}</h5>

                  <p className="text-light mb-0">
                   {profile?.bio}
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
