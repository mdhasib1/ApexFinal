import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './hero.css';

function Hero() {
  return (
    <div className="hero-container">

<div className='container'>
      <div className="row hero">
        <div className="col-lg-7 hero-text">

      <h6 className="text-light title-dark fw-bold">APEXNFTCARD</h6>
                <h4 className=" text-white ">
                  Create, sell or collect digital Items.
                </h4>
                <p className="text-white-60 para-desc mb-0 mb-0">
                  Discover the mythical world of dragons with our unique NFT
                  Marketplace. Explore a collection of hand-drawn, one-of-a-kind
                  dragon art pieces, each with its own story to tell. Own a
                  piece of digital history and become the proud owner of a
                  dragon NFT today.
                </p>
        <div className="btnhome">
          <Button><Link to='/explore' className='text-light text-decoration-none'>Explore</Link></Button>
          <Button><Link to='/create' className='text-light text-decoration-none'>Create</Link></Button>
        </div>
        </div>
        <div className="col-lg-5 hero-image">

        <img src='./dragon.png' alt='dragon' />
        </div>
      </div>

    </div>
    </div>

  );
}

export default Hero;
