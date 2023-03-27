import axios from 'axios';
import { Buffer } from 'buffer';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import "react-confirm-alert/src/react-confirm-alert.css";
import { useNavigate } from 'react-router-dom';
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;



const API_URL = `${BACKEND_URL}/api/collection`;

function CreateCollection() {
  const [imageURI,setImageURI] = useState('')
  const [collectionName , setCollectionName] = useState('')
  const [collectiondes , setCollectionDes] = useState('')
  const [show, setShow] = useState(false);

  const navigate = useNavigate()

  const [collection, setCollection] = useState([])

  useEffect(() => {
  axios.get(API_URL)
  .then((res)=>{
    setCollection(res.data)
  })
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);




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



 const deleteCollection = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};


const handleDelete = async (id) => {
  console.log('Attempting to delete collection with ID:', id); // Add this line
  try {
    await deleteCollection(id);
    setCollection(collection.filter((collection) => collection._id !== id));
    console.log('Collection deleted in frontend:', id); // Add this line
  } catch (error) {
    console.error('Error deleting collection:', error);
  }
};

  

  return (
    <div className="table">
    <div className="--flex-between --flex-dir-column">
      <span>
        <h3>All Collection </h3>
      </span>
      <span>
      <button onClick={handleShow} style={{ backgroundColor: 'blue' }} className='btn btn-primary'>Add Collection</button>
      </span>
    </div>

    <div className="table">
        <table>
          <thead>
            <tr>
              <th>Collection Name</th>
              <th>Collection Cover</th>
              <th>Collection Description</th>
              <th>Action</th>
              

            </tr>
          </thead>

          <tbody>
           {collection.map((coll, index)=>(
                <tr key={index + 1}>
                  <td>{coll.collectionname}</td>
                  <td>
                     <img style={{ width: '50px' }} src={coll.collectionimage} alt="collection"  />
                  </td>
                  <td>
                    {coll.collectiondes}
                  </td>
                  <td className="icons">
                     <button onClick={() => handleDelete(coll._id)} className="btn btn-danger">Delete</button>
                  </td>
                </tr>
                ))}
          </tbody>
        </table>
    </div>



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
  </Modal>

  </div>
  )
}

export default CreateCollection