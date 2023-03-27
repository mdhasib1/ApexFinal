import axios from 'axios'
import { Buffer } from 'buffer'
import { ethers } from 'ethers'
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import "react-confirm-alert/src/react-confirm-alert.css"
import LoadingScreen from 'react-loading-screen'
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify"
import './Upload.css'
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;



const API_URL = `${BACKEND_URL}/api`;




const UploadWork = () => {
  const navigate = useNavigate()
  // const [file, setFile] = useState(null);
  const [price, setPrice] = useState('');
  const [nftcollection, setNFTCollection] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [author,setAuthor] =useState('')
  const [endTime, setEndTime] = useState('');
  const [imageURI,setImageURI] = useState('')

  const [collection, setCollection] = useState([])
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [collectionName , setCollectionName] = useState('')
  const [collectiondes , setCollectionDes] = useState('')



  useEffect(()=>{
      axios.get(`${API_URL}/collection`)
      .then((res)=>{
        setCollection(res.data)
      })
  },[])



  const [gasLimit, setGasLimit] = useState(null);
const apiKey = '7KHZT2DHV1T6E9ZYIYKERHW25YWB19UH32';
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

//Now you can use the gasLimit value to set the gas limit of your transaction


  // const [gasLimit, setGasLimit] = useState([]);
  // useEffect(() => {
  // const apiKey = 'RICHI4EG2D7RE4CDIKZ5GD6RNR6YWQW32V'; // replace with your actual API key
  // const gasPrice = 20e9; // gas price in wei
  // const apiUrl = `https://api.etherscan.io/api?module=gastracker&action=gasestimate&gasprice=${gasPrice}&apikey=${apiKey}`;

  //   axios.get(apiUrl)
  //     .then(response => {
  //       const gasLimit = response.data.result;
  //       setGasLimit(gasLimit)
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });

  // }, []);

   const[abi,setAbi] = useState([])
   useEffect(()=>{
    axios.get(`${API_URL}/abi`)
    .then((response)=>{
      setAbi(response.data.abi)
    })
  })

  const handCollection = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("collectionname", collectionName);
    formData.append("collectiondes", collectiondes);
    formData.append("file", imageURI);
  
    // Log FormData entries
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }
  
    axios.post(API_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res)=>{
      if(res.status === 201){
        handleClose()
        navigate('/all-collection')
      }
      
    })
  }



  const contractAddress = "0x3d242326441D640278a163A4169F4F1Ef6569FE4";

  useEffect(() => {
    async function getWalletAddress() {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts',
          });
          setAuthor(accounts[0]);
        } catch (error) {
          console.error(error);
        }
      } else {
        navigate('/');
      }
    }
    getWalletAddress();
  }, [navigate]);
  


  const projectId = "2NKl9R7RGe4cOdLOODiagnFLYJW";
const projectSecret = "7802fbb4486f13622ea61aa41c407f8b";
const subdomainName = "dragonsharenft";

const endpointBasePath = `https://${subdomainName}.infura-ipfs.io/ipfs/`;

const authorization = `Basic ${Buffer.from(
  `${projectId}:${projectSecret}`
).toString("base64")}`;



const handleImageChange = async (e) => {
  e.preventDefault();

  let reader = new FileReader();
  let file = e.target.files[0];

  reader.onloadend = async () => {


      const formData = new FormData();
      formData.append("image", file);

    try {
      const response = await axios.post("https://ipfs.infura.io:5001/api/v0/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: authorization,
        },
      });

      const cid = response.data.Hash;
      const imageURI = `${endpointBasePath}${cid}`;
      setImageURI(imageURI);

      const parent = document.querySelector(".preview-box");
      parent.innerHTML = `<img className="preview-content" src=${imageURI} />`;
    } catch (error) {
      console.error(error);
    }
  };

  reader.readAsDataURL(file);
};

  


  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
  
    try {
      // Connect to Ethereum network
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const nonce = await provider.getTransactionCount(accounts[0], 'latest');
      const gasPrice = await provider.getGasPrice();

  
      const contract = new ethers.Contract(contractAddress, abi, signer);
  
      const transactionObject = {
        from: accounts[0],
        nonce,
        gasPrice,
        gasLimit,
      };
  
      // Check if user has approved the transaction in MetaMask
      const isApproved = await signer.provider.send("eth_getTransactionCount", [accounts[0], "latest"]);
      if (isApproved === "0x0") {
        setIsLoading(false);
        toast.error('Transaction rejected by user.');
        return;
      }
  
      // Create new NFT on the blockchain
      const tx = await contract.createToken(
        imageURI,
        // 
        ethers.utils.parseEther(price),
        author,
        nftcollection,
        name,
        description,
        Math.floor(Date.parse(endTime) / 1000)
      );
      const receipt = await tx.wait();
  
      if (receipt.status === 0) {
        setIsLoading(false);
        toast.error('Transaction failed.');
        console.log(receipt);
        return;
      }
  
      // Retrieve NFT metadata from the contract
      const tokenId = receipt.events[0].args.tokenId.toString();
      const tokenURI = await contract.tokenURI(tokenId);
  
      // Get owner and seller of NFT
      const owner = await contract.getNFTOwner(tokenId);

      // Save NFT data to database
      const nftData = {
        tokenId,
        name,
        description,
        price,
        author,
        nftcollection,
        image: tokenURI,
        endTime,
        owner,
        seller:author,
        sold: false,
      };
  
      const response = await axios.post(`${API_URL}/nfts`, nftData);
  
      if (response.data.success === true) {
        setIsLoading(false);
        toast.success('NFT created successfully!');
        navigate('/');
      }
  
    } catch (error) {
      setIsLoading(false);
      toast.error('Failed to create NFT.');
      console.error(error);
    }
  };
  
  

  return (
    <>
       <LoadingScreen
      loading={isLoading}
      bgColor='linear-gradient(
        1550deg,
        #8000ff,
        #18014a,
        #39035a
      ) !important'
      spinnerColor='#9ee5f8'
      textColor='#676767'
      logoSrc='./dragon.png'
      text='Wait for Confirmation'
    >
      {/* Start Home */}
      <section className="bg-half-170 d-table w-100">
        <div className="bg-overlay bg-gradient-overlay-2"></div>
        <div className="container">
          <div className="row mt-5 justify-content-center">
            <div className="col-12">
              <div className="title-heading text-center">
                <h5 className="heading fw-semibold sub-heading text-white title-dark">
                  Create NFT
              </h5>
              <p className="text-white-50 para-desc mx-auto mb-0">
                Add your digital art and work
              </p>
            </div>
          </div>
          {/*end col*/}
        </div>
        {/*end row*/}
      </div>
      {/*end container*/}
    </section>


    {/* Start */}
    <section className="section">
      <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-lg-12 m-auto col-md-10 order-1 p-5 order-md-2">
            <div className=" p-5 text-light rounded-md shadow p-4">
              <div className="row">
        
                {/*end col*/}

                <div className="col-lg-7 mt-4 mt-lg-0">
                  <div className="ms-lg-4">
              
                      <div className="row">
                        <div className="col-12 mb-4">
                          <label className="form-label fw-bold">
                           NFT  Name <span className="text-danger">*</span>
                          </label>
                          <input
                            name="name"
                            id="name"
                            type="text"
                            className="form-control"
                            placeholder="Title :"
                            onChange={(e)=>setName(e.target.value)}
                             required
                          />
                        </div>
                        {/*end col*/}

                        <div className="col-12 mb-4">
                          <label className="form-label fw-bold">
                            {' '}
                            Description :{' '}
                          </label>
                          <textarea
                            name="description"
                            id="comments"
                            rows="4"
                            className="form-control"
                            placeholder="Description :"
                            onChange={(e)=>setDescription(e.target.value)}
                            required
                          ></textarea>
                        </div>
                        {/*end col*/}

                        <div className="col-md-6 mb-4">
                          <label className="form-label fw-bold">Select Your Collection :</label>
                          <select className="form-control" name="nftcollection" onChange={(e)=>setNFTCollection(e.target.value)}  required>
                            {collection.map((coll,index)=>{
                              return(
                                <option value={coll.collectionname} >{coll.collectionname}</option>
                              )
                            })}
                          </select>
                          <button onClick={handleShow} style={{ backgroundColor: 'blue' }} className='btn btn-primary'>Add Collection</button>
                        </div>
                        {/*end col*/}

                        <div className="col-md-6 mb-4">
                          <label className="form-label fw-bold">
                            {' '}
                            Rate :{' '}
                          </label>
                          <input
                            name="price"
                            type="text"
                            className="form-control"
                            id="price"
                            onChange={(e)=>setPrice(e.target.value)}
                            required
                          />
                        </div>
                        <div className="col-md-6 mb-4">
  <label className="form-label fw-bold">End Time:</label>
  <input
    name="endTime"
    type="datetime-local"
    className="form-control"
    onChange={(e) => setEndTime(e.target.value)}
    required
  />
</div>
        
                        {/*end col*/}
                      </div>
  
                  </div>
                </div>

                <div className="col-lg-5">
                  <div className="d-grid">
                    <p className="fw-semibold mb-4">
                      Upload your ART here, Please click "Upload Image"
                      Button.
                    </p>
                    <div className="preview-box d-block justify-content-center rounded-md shadow overflow-hidden bg-light text-muted p-2 text-center small">
                      Supports JPG, PNG and MP4 videos. Max file size : 10MB.
                    </div>
                    <input
                      type="file"
                      id="input-file"
                      name="image"
                      accept="image/*"
                      onChange={handleImageChange}
                      hidden
                      required
                    />
                    <label
                      className="btn-upload btn btn-primary rounded-md mt-4"
                      htmlFor="input-file"
                    >
                      Upload Image
                    </label>
                  </div>
                </div>

                {/*end col*/}
                
              </div>
              <div className="col-lg-12 mt-5">
                          <button
                            type="submit"
                            className="btn btn-primary rounded-md"
                          >
                            Create Item
                          </button>
                        </div>

              {/*end row*/}
            </div>
            
          </div>
          {/*end col*/}
          
        </div>
        </form>
        {/*end row*/}
      </div>
      {/*end container*/}
    </section>
    </LoadingScreen>
    <Modal show={show} onHide={handleClose} centered>
    <Form onSubmit={handCollection}>
        <Modal.Header closeButton>
          <Modal.Title  className='text-light'>Add Collection</Modal.Title>
        </Modal.Header>
        <Modal.Body>
       
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className='text-light'>Collection Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Collection name"
                autoFocus
                name="collectionname"
                value={collectionName}
                onChange={(e)=> setCollectionName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className='text-light'>Collection Cover</Form.Label>
              <div className="d-grid">
                        <div className="preview-box d-block justify-content-center rounded-md shadow overflow-hidden bg-light text-muted p-2 text-center small">
                          Supports JPG, PNG and MP4 videos. Max file size : 10MB.
                        </div>
                        <input
                          type="file"
                          id="input-file"
                          name="image"
                          accept="image/*"
                          onChange={handleImageChange}
                          hidden
                          required
                        />
                        <label
                          className="btn-upload btn btn-primary rounded-md mt-4"
                          htmlFor="input-file"
                        >
                          Upload Image
                        </label>
                      </div>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label className='text-light'> Collection Description</Form.Label>
              <Form.Control name="collectiondes" value={collectiondes} required  onChange={(e)=> setCollectionDes(e.target.value)} as="textarea" rows={3} />
            </Form.Group>
      
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type='submit'>
            Save Changes
          </Button>
        </Modal.Footer>
        </Form>
      </Modal></>
  )
}

export default UploadWork
