import React from 'react';
import PropTypes from 'prop-types';

const Product = ({ image, name, price }) => {
  console.log({image, name, price});
  return (
    <article className='product'>
      <h4>single product</h4>
      {/* <img src={image.url} alt={name} />
      <h4>{name}</h4>
      <p>${price}</p> */}
    </article>
  );
};

Product.propTypes;

export default Product;
