import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import {
  bg01, gif1,
  gif2,
  gif3,
  gif4,
  gif5,
  gif6, item1, item10, item2,
  item3,
  item4,
  item5,
  item6,
  item7,
  item8,
  item9
} from '../../Components/imageImport/index.js';


const Explore= () => {

  const AuctionData = [
    {
      image: gif1,
      title: 'Deep Sea Phantasy',
      id: 'May 29, 2022 6:0:0',
      type: 'GIFs',
    },
    {
      image: item1,
      title: 'CyberPrimal 042 LAN',
      id: '',
      type: 'Arts',
    },
    {
      image: gif2,
      title: 'Crypto Egg Stamp #5',
      id: '',
      type: 'Games',
    },
    {
      image: item2,
      title: 'Colorful Abstract Painting',
      id: 'June 03, 2022 5:3:1',
      type: '',
    },
    {
      image: item3,
      title: 'Liquid Forest Princess',
      id: '',
      type: '',
    },
    {
      image: gif3,
      title: 'Spider Eyes Modern Art',
      id: 'June 10, 2022 1:0:1',
      type: 'GIFs',
    },
    {
      image: item4,
      title: 'Synthwave Painting',
      id: '',
      type: '',
    },
    {
      image: gif4,
      title: 'Contemporary Abstract',
      id: '',
      type: 'GIFs',
    },
    {
      image: item5,
      title: 'Valkyrie Abstract Art',
      id: '',
      type: '',
    },
    {
      image: gif5,
      title: 'The girl with the firefly',
      id: '',
      type: '',
    },
    {
      image: item6,
      title: 'Dodo hide the seek',
      id: '',
      type: '',
    },
    {
      image: gif6,
      title: 'Pinky Ocean',
      id: 'June 10, 2022 1:0:1',
      type: '',
    },
    {
      image: item7,
      title: 'Rainbow Style',
      id: 'June 18, 2022 1:2:1',
      type: 'Music',
    },
    {
      image: item8,
      title: 'Running Puppets',
      id: '',
      type: 'Gallery',
    },
    {
      image: item9,
      title: 'Loop Donut',
      id: 'July 01, 2022 1:6:6',
      type: 'Video',
    },
    {
      image: item10,
      title: 'This is Our Story',
      id: 'July 15, 2022 2:5:5',
      type: '',
    },
  ]

  return (
    <>
      {/* Start Home */}
      <section
        className="bg-half-170 d-table w-100"
        style={{ background: `url(${bg01}) bottom` }}
      >
        <div className="bg-overlay bg-gradient-overlay-2"></div>
        <div className="container">
          <div className="row mt-5 justify-content-center">
            <div className="col-12">
              <div className="title-heading text-center">
                <h5 className="heading fw-semibold sub-heading text-white title-dark">
                  Marketplace
                </h5>
                <p className="text-white-50 para-desc mx-auto mb-0">
                  Explore the latest NFTs digital product
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
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="features-absolute">
                <div className="row justify-content-center" id="reserve-form">
                  <div className="col-xl-10 mt-lg-5">
                    <div className="card bg-white feature-top border-0 shadow rounded p-3">
                      <form action="#" >
                        <div className="registration-form text-dark text-start">
                          <div className="row g-lg-0">
                            <div className="col-lg-9 col-md-6">
                              <div className="filter-search-form position-relative filter-border">
                                <i className="uil uil-search icons"></i>
                                <input
                                  name="name"
                                  type="text"
                                  id="search-keyword"
                                  className="form-control filter-input-box bg-light border-0"
                                  placeholder="Search your keaywords"
                                />
                              </div>
                            </div>
                            {/*end col*/}


                            <div className="col-lg-3 col-md-6 mt-3 mt-lg-0">
                              <input
                                type="submit"
                                id="search"
                                name="search"
                                style={{ height: 40 }}
                                className="btn btn-primary rounded-md searchbtn submit-btn w-100"
                                value="Search"
                              />
                            </div>
                            {/*end col*/}
                          </div>
                          {/*end row*/}
                        </div>
                        {/*end container*/}
                      </form>
                    </div>
                  </div>
                  {/*ed col*/}
                </div>
                {/*end row*/}
              </div>
            </div>
            {/*end col*/}
          </div>
          {/*end row*/}
        </div>
        {/*end container*/}

        <Container>
      <Row className="mt-4 p-5">
        {AuctionData.length > 0 ? (
          AuctionData.map((result) => (
            <Col xs={12} md={6} lg={3} key={result.id} className="mb-4  p-3">
              <Card className='nftcard'>
                <Card.Img variant="top" className='py-3 px-2' height={250} src={result.image} />
                <Card.Body>
                  <Card.Title>{result.title}</Card.Title>
                  <Card.Text>{result.title}</Card.Text>
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
        {/*end container*/}
      </section>
    </>
  )
}

export default Explore;
