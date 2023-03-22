import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import './collection.css';

const Carousels = () => {
  const [index, setIndex] = useState(1);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const items = [
    {
      title: 'Collection Name 1',
      image: 'https://via.placeholder.com/300x200',
      profileImage: 'https://via.placeholder.com/100x100',
    },
    {
      title: 'Collection Name 2',
      image: 'https://via.placeholder.com/300x200',
      profileImage: 'https://via.placeholder.com/100x100',
    },
    {
      title: 'Collection Name 3',
      image: 'https://via.placeholder.com/300x200',
      profileImage: 'https://via.placeholder.com/100x100',
    },
    {
      title: 'Collection Name 4',
      image: 'https://via.placeholder.com/300x200',
      profileImage: 'https://via.placeholder.com/100x100',
    },
    {
      title: 'Collection Name 5',
      image: 'https://via.placeholder.com/300x200',
      profileImage: 'https://via.placeholder.com/100x100',
    },
    {
      title: 'Collection Name 6',
      image: 'https://via.placeholder.com/300x200',
      profileImage: 'https://via.placeholder.com/100x100',
    },
    {
      title: 'Collection Name 7',
      image: 'https://via.placeholder.com/300x200',
      profileImage: 'https://via.placeholder.com/100x100',
    },
    {
      title: 'Collection Name 8',
      image: 'https://via.placeholder.com/300x200',
      profileImage: 'https://via.placeholder.com/100x100',
    },
    {
      title: 'Collection Name 9',
      image: 'https://via.placeholder.com/300x200',
      profileImage: 'https://via.placeholder.com/100x100',
    },
    {
      title: 'Collection Name 10',
      image: 'https://via.placeholder.com/300x200',
      profileImage: 'https://via.placeholder.com/100x100',
    },
  ];

  const numCardsToShow = 6;
  const numCardsToSlide = 2;
  const numCards = items.length;

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
              {items
                .slice(slideIndex * numCardsToSlide, slideIndex * numCardsToSlide + numCardsToShow)
                .map((item, itemIndex) => (
                  <div className={`col-lg-${12 / numCardsToShow} col-md-6 col-sm-12`} key={itemIndex}>
                    <div className='card'>
                      <img className='card-img-top' src={item.image} alt='Card cap' />
                      <div className='card-body d-flex flex-column collectionProfile align-items-center'>
                        <img src="./Images/dragon.png" alt='Collection profile' className='rounded-circle mb-3' />
                        <h5 className='card-title text-center'>{item.title}</h5>
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
