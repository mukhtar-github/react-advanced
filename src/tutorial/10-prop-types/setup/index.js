import React from 'react';
import Product from './Product';
import { useFetch } from '../../9-custom-hooks/final/2-useFetch';
// import defaultImage from '../../../assets/default-image.jpeg';

const url = 'https://course-api.com/react-prop-types-example';

const Index = () => {
  const { products } = useFetch(url);
  return (
    <div>
      <h2>products</h2>
      {/* <img src={defaultImage} alt='name'/> */}
      <section className='products'>
        {products.map((product) => {
          // for each and every product, we're returning a Product component
          // then we need to pass in the key prop,
          // and then we do the object spread operator, where we pass in all the properties for
          // each and every product into the Product component.
          return <Product key={product.id} {...product} />
        })}
      </section>
    </div>
  );
};

export default Index;
