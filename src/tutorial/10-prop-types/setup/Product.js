import React from 'react';

const Product = ({ image, name, price }) => {
  return (
    <article className='product'>
      <h4>{name}</h4>
    </article>
  );
};

export default Product;
