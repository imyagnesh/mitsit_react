import Product from 'components/Product';
import React, { useCallback, useEffect } from 'react';

type Props = {
  products: ProductType[];
  loadCart: () => Promise<void>;
  loadProducts: () => Promise<void>;
};

const Home = ({ products, loadProducts, loadCart }: Props) => {
  const loadData = useCallback(async () => {
    await Promise.all([loadProducts(), loadCart()]);
  }, [loadProducts, loadCart]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <div className="container mx-auto">
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
}

Home.displayName = 'Home';

export default Home;
