import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import './explore.css';

const Explorer = () => {
  // const [searchQuery, setSearchQuery] = useState('');
  // const [searchResults, setSearchResults] = useState([]);

  const nfts = [
    {
      id: 1,
      name: 'NFT Artwork',
      description: 'This is a beautiful piece of artwork created as an NFT',
      creator: 'John Doe',
      price: 0.5,
      image: 'https://via.placeholder.com/300x200'
    },
    {
      id: 2,
      name: 'Collectible NFT',
      description: 'This is a rare collectible NFT',
      creator: 'Jane Smith',
      price: 1.2,
      image: 'https://via.placeholder.com/300x200'
    },
    {
      id: 3,
      name: 'NFT Music Album',
      description: 'This is a unique music album created as an NFT',
      creator: 'Mike Johnson',
      price: 2.5,
      image: 'https://via.placeholder.com/300x200'
    },
    {
      id: 4,
      name: 'NFT Music Album',
      description: 'This is a unique music album created as an NFT',
      creator: 'Mike Johnson',
      price: 2.5,
      image: 'https://via.placeholder.com/300x200'
    },
    {
      id: 5,
      name: 'NFT Music Album',
      description: 'This is a unique music album created as an NFT',
      creator: 'Mike Johnson',
      price: 2.5,
      image: 'https://via.placeholder.com/300x200'
    },
    {
      id: 6,
      name: 'NFT Music Album',
      description: 'This is a unique music album created as an NFT',
      creator: 'Mike Johnson',
      price: 2.5,
      image: 'https://via.placeholder.com/300x200'
    },
    {
      id: 7,
      name: 'NFT Music Album',
      description: 'This is a unique music album created as an NFT',
      creator: 'Mike Johnson',
      price: 2.5,
      image: 'https://via.placeholder.com/300x200'
    },
    {
      id: 8,
      name: 'NFT Music Album',
      description: 'This is a unique music album created as an NFT',
      creator: 'Mike Johnson',
      price: 2.5,
      image: 'https://via.placeholder.com/300x200'
    },
  ];
  

  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   // code to search for results based on searchQuery
  //   // set searchResults state with the results
  // };

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
    </Container>
  );
};

export default Explorer;
