import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;



const API_URL = `${BACKEND_URL}/api/nfts/authors/top`;
const TopAuthorsSection = () => {

  const [authors , setAuthors] = useState([])

  useEffect(()=>{
    axios.get(API_URL)
    .then((res)=>{
      setAuthors(res.data)
    })
  },[])

  return (
    <section className="transparent py-5">
      <Container>
        <h2 className="mb-4 text-light">Top Authors</h2>
        <Row xs={2} md={3} lg={4} className="g-4">
          {authors.map((author) => (
            <Col key={author.name}>
              <div className="d-flex align-items-center">
                <Image
                  src={author.profileImageUrl}
                  roundedCircle
                  width={64}
                  height={64}
                  className="me-3"
                />
                <div>
                  <h5 className="mb-0 text-light">{author.name}</h5>
                  <small className="text-muted">{author.sales} sales</small>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default TopAuthorsSection;
