import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import './collection.css';
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;



const API_URL = `${BACKEND_URL}/api/collection`;
const Carousels = () => {
  const [index, setIndex] = useState(1);

  const [collection, setCollection] = useState([])

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };


  useEffect(() => {
    axios.get(API_URL)
    .then((res)=>{
      setCollection(res.data)
    })
  }, []);


  const numCardsToShow = 6;
  const numCardsToSlide = 2;
  const numCards = collection.length;

  return (
    <div>
      <Carousel
        className='container bg-transparent py-5'
        activeIndex={index}
        onSelect={handleSelect}
        interval={30000}
        indicators={numCards > numCardsToShow}
        controls={numCards > numCardsToShow}
        fade={false}
        slide={true}
        touch={true}
        keyboard={true}
      >
        <h2 className='mb-4 text-light'>Hot Collection</h2>
        {Array.from({ length: Math.ceil(numCards / numCardsToShow) }).map((_, slideIndex) => (
          <Carousel.Item key={slideIndex}>
            <div className='row collection'>
              {collection
                .slice(slideIndex * numCardsToSlide, slideIndex * numCardsToSlide + numCardsToShow)
                .map((item, itemIndex) => (
                  <div className={`col-lg-${12 / numCardsToShow} col-md-6 col-sm-12`} key={itemIndex}>
                    <div className='card'>
                      <img className='card-img-top' src={item.collectionimage} alt='Card cap' />
                      <h5 className='mt-4 card-title text-light text-center'>{item.collectionname}</h5>
                      <div className='card-body d-flex flex-column collectionProfile align-items-center'>
                        <img src="./Images/dragon.png" alt='Collection profile' className='rounded-circle mb-3' />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Carousels;
