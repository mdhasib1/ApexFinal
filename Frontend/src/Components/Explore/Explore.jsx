import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './explore.css';

const API_URL = `http://localhost:8000/api/nfts`

const Explorer = () => {
   const [nfts , setNfts] = useState([]);

   useEffect(()=>{
    axios.get(API_URL)
    .then((response)=>{
      setNfts(response.data.nfts)
    })
   })


  return (
    <Container>
      <Row>
        <Col>
          <h1 className='text-light'>HOT NFTs</h1>
        </Col>
      </Row>
      <Row className="mt-4">
        {nfts.length > 0 ? (
          nfts.map((result) => (
            <Col xs={12} md={6} lg={3} key={result._id} className="mb-4  p-2">
                   <Link to={`/nfts/${result?.tokenId}`}>
              <Card className='nftcard'>
                <Card.Img variant="top" className='py-2 px-2  p-5' height={240} src={result.image} />
                <Card.Body >
                  <Card.Title>{result.name}</Card.Title>
                  {/* <Card.Text>{result.description}</Card.Text> */}
                  <div className="d-flex justify-content-between align-items-center">
                    <small>{result.creator}</small>
                    <small>{result.price} ETH</small>
                  </div>
                </Card.Body>
              </Card>
              </Link>
            </Col>
          ))
        ) : (
          <Col>
            <p className='text-center text-light fs-1'>No NFTs found.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Explorer;
