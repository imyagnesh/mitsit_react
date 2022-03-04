import { loadCartAction } from 'actions/cartActions';
import { loadProductsAction } from 'actions/productsActions';
import Product from 'components/Product';
import { AppDispatch } from 'configureStore';
import { useCart } from 'context/cartContext';
import { useProducts } from 'context/productsProvider';
import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { RootState } from 'reducers';

type Props = {
  products: ProductType[];
  cart: CartType[];
  loadCart: () => Promise<void>;
  loadProducts: () => Promise<void>;
};

const Home = ({ products, cart, loadProducts, loadCart }: Props) => {
  const { productsState } = useProducts();
  const { cartState, addToCart, deleteItem, updateToCart } = useCart();

  const loadData = useCallback(async () => {
    await Promise.all([loadProducts(), loadCart()]);
  }, [loadProducts, loadCart]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <div className="container mx-auto">
      {products.map((product) => {
        const addCartLoader = cartState.loading.find(
          (x) => x.type === 'ADD_CART_ITEM' && x.id === product.id,
        );
        const updateCartLoader = cartState.loading.find(
          (x) => x.type === 'UPDATE_CART_ITEM' && x.id === product.id,
        );
        const deleteCartLoader = cartState.loading.find(
          (x) => x.type === 'DELETE_CART_ITEM' && x.id === product.id,
        );
        const cartItem = cart.find((x) => x.productId === product.id);
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

const mapStateToProps = (state: RootState) => ({
  products: state.products,
  cart: state.cart,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  loadProducts: () => loadProductsAction()(dispatch),
  loadCart: () => loadCartAction()(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
