import Product from 'components/Product';
import React, { useCallback, useEffect, useState } from 'react';
// import moment from 'moment';

type Props = {
  products: ProductType[];
  loadCart: () => void;
  loadProducts: () => void;
};

const Home = ({ products, loadProducts, loadCart }: Props) => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    loadProducts();
    loadCart();
  }, [loadProducts, loadCart]);

  const loadCurrentTime = async () => {
    console.log('loadCurrentTime');

    try {
      const moment = (await import('moment')).default;
      setCurrentTime(moment().format('dd-mm-yyyy'));
    } catch (error) {}
  };

  return (
    <div className="container mx-auto">
      <button type="button" onClick={() => loadCurrentTime()}>
        Load Current Time
      </button>
      {currentTime && <h1>{currentTime}</h1>}
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
};

Home.displayName = 'Home';

export default Home;
