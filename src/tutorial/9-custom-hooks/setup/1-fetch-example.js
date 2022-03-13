import { useFetch } from './2-useFetch.js';

const url = 'https://course-api.com/javascript-store-products';

const Example = () => {
  const { loading, products } = useFetch(url);
  console.log(products);
  return (
    <div>
      <h2>{loading ? 'loading...' : 'data'}</h2>
    </div>
  );
};

export default Example;
