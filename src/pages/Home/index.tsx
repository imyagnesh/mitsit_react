import Product from 'components/Product';
import { useCart } from 'context/cartContext';
import { useProducts } from 'context/productsProvider';
import React, { useCallback, useEffect } from 'react';

type Props = {};

const Home = (props: Props) => {
  const { loadProducts, productsState } = useProducts();
  const { loadCart, cartState, addToCart, deleteItem, updateToCart } =
    useCart();

  const loadData = useCallback(async () => {
    await Promise.all([loadProducts(), loadCart()]);
  }, [loadProducts, loadCart]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <div className="container mx-auto">
      {productsState.products.map((product) => {
        const addCartLoader = cartState.loading.find(
          (x) => x.type === 'ADD_CART_ITEM' && x.id === product.id,
        );
        const updateCartLoader = cartState.loading.find(
          (x) => x.type === 'UPDATE_CART_ITEM' && x.id === product.id,
        );
        const deleteCartLoader = cartState.loading.find(
          (x) => x.type === 'DELETE_CART_ITEM' && x.id === product.id,
        );
        const cartItem = cartState.cart.find((x) => x.productId === product.id);
        return (
          <Product
            key={product.id}
            product={product}
            addToCart={addToCart}
            addCartLoader={addCartLoader}
            updateToCart={updateToCart}
            deleteItem={deleteItem}
            cartItem={cartItem}
            updateCartLoader={updateCartLoader}
            deleteCartLoader={deleteCartLoader}
          />
        );
      })}
    </div>
  );
};

Home.displayName = 'Not Found';

export default Home;
