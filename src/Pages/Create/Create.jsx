import axios from 'axios'
import React, { useState } from 'react'
import LoadingScreen from 'react-loading-screen'
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify"
import './Upload.css'




const UploadWork = () => {
  const navigate = useNavigate()
  const [file, setFile] = useState(null);
  const [price, setPrice] = useState('');
  // const [author, setAuthor] = useState('');
  const [nftcollection, setNFTCollection] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);


//   const [gasLimit, setGasLimit] = useState(null);
// const apiKey = 'RICHI4EG2D7RE4CDIKZ5GD6RNR6YWQW32V';
// const gasPrice = '2000000000'; // 2 gwei in wei
// const apiUrl = `https://api-goerli.etherscan.io/api?module=gastracker&action=gasestimate&gasprice=${gasPrice}&apikey=${apiKey}`;

// useEffect(() => {
//   axios.get(apiUrl)
//     .then(response => {
//       setGasLimit(response.data.result.SafeGasPrice);
//     })
//     .catch(error => {
//       console.error(error);
//     });
// }, [apiUrl]);

// Now you can use the gasLimit value to set the gas limit of your transaction


  // const [gaslimit, setGasLimit] = useState([]);
  // useEffect(() => {
  // const apiKey = 'RICHI4EG2D7RE4CDIKZ5GD6RNR6YWQW32V'; // replace with your actual API key
  // const gasPrice = '2000000000'; // gas price in wei
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



  const contractAddress = "0x9D53e9253d8E4b5f244C62cf577c0C0D2462f674";

  // useEffect(() => {
  //   async function getWalletAddress() {
  //     if (window.ethereum) {
  //       const web3 = new Web3(window.ethereum);
  //       try {
  //         const accounts = await web3.eth.requestAccounts();
  //         setAuthor(accounts[0]);
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     } else {
  //       navigate('/')
  //     }
  //   }
  //   getWalletAddress();
  // }, [navigate]);




  const handleImageChange = e => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setFile(file);
      const parent = document.querySelector('.preview-box')
      parent.innerHTML = `<img className="preview-content" src=${reader.result} />`
    };

    reader.readAsDataURL(file);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [
        {

          to: contractAddress,
          value: '0x0',
          gas: '2000000000', 
          gasPrice: '500', 
        },
      ],
    });
  
    try {

      // Open MetaMask modal to connect wallet
      await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
  
      const formData = new FormData();
      formData.append('image', file);
      formData.append('price', price);
      // formData.append('author', author);
      formData.append('nftcollection', nftcollection);
      formData.append('name', name);
      formData.append('description', description);
  
      await axios.post('http://localhost:8000/api/nfts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((response)=>{
        console.log(response)
        if(response.data.success === true){
          setIsLoading(false);
          toast.success("nft create succeeded!");
          navigate('/');
        }
      });
    } catch (error) {
      toast.error("NFT create Faild.");
    }
  
    setIsLoading(false);
  };
  
  
  return (
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
                            <option value={1} >GIFs</option>
                            <option value={2}>Music</option>
                            <option value={3}>Video</option>
                            <option value={4} >Tech</option>
                          </select>
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

  )
}

export default UploadWork
