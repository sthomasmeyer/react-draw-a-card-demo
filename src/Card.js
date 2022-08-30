import React from 'react';
import './Card.css';

const Card = ({ id, image }) => {
  return (
    <div className='Card'>
      <img src={image} id={id} alt='playing card' />
    </div>
  );
};

export default Card;
