import Product from 'components/Product';
import React, { useCallback, useEffect, useMemo, useReducer } from 'react';
import rootReducer, { initialRootState } from 'reducers/rootReducer';
import axiosInstance from 'utils/axiosInstance';

type Props = {};

const Home = (props: Props) => {
  const [state, dispatch] = useReducer(rootReducer, initialRootState);

  console.log(state);

  const loadData = useCallback(async () => {
    try {
      dispatch({
        type: 'LOAD_PRODUCTS_REQUEST',
        payload: { message: 'Loading Products' },
      });
      dispatch({
        type: 'LOAD_CART_REQUEST',
        payload: { message: 'Loading Cart Items' },
      });
      const res = await Promise.all([
        axiosInstance.get<ProductType[]>('products'),
        axiosInstance.get<CartType[]>('cart'),
      ]);
      dispatch({
        type: 'LOAD_PRODUCTS_SUCCESS',
        payload: res[0].data,
      });
      dispatch({
        type: 'LOAD_CART_SUCCESS',
        payload: res[1].data,
      });
    } catch (err) {
      dispatch({
        type: 'LOAD_PRODUCTS_FAIL',
        payload: {
          error: err as Error,
          message: 'Load Products failed',
        },
      });
      dispatch({
        type: 'LOAD_CART_FAIL',
        payload: {
          error: err as Error,
          message: 'Load Cart failed',
        },
      });
    }
  }, []);

  const addToCart = useCallback(async (productId: number, quantity: number) => {
    try {
      dispatch({
        type: 'ADD_CART_ITEM_REQUEST',
        payload: {
          id: productId,
          message: 'Adding Item in the cart',
        },
      });
      const res = await axiosInstance.post<CartType>('cart', {
        productId,
        quantity,
      });

      dispatch({
        type: 'ADD_CART_ITEM_SUCCESS',
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: 'ADD_CART_ITEM_FAIL',
        payload: {
          id: productId,
          error,
          message: 'Item not added to cart',
        },
      });
    }
  }, []);

  const updateToCart = useCallback(async (cartItem: CartType) => {
    try {
      dispatch({
        type: 'UPDATE_CART_ITEM_REQUEST',
        payload: {
          id: cartItem.productId,
          message: 'Updating Cart Item',
        },
      });
      const res = await axiosInstance.put(`cart/${cartItem.id}`, cartItem);
      dispatch({
        type: 'UPDATE_CART_ITEM_SUCCESS',
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: 'UPDATE_CART_ITEM_FAIL',
        payload: {
          id: cartItem.productId,
          error,
          message: 'Updating Item fail',
        },
      });
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const loader = useMemo(
    () => state.loading.find((x) => x.type === 'LOAD_PRODUCTS'),
    [state.loading],
  );

  const error = useMemo(
    () => state.error.find((x) => x.type === 'LOAD_PRODUCTS'),
    [state.error],
  );

  if (loader) {
    return <h1>{loader.message || 'Loading...'}</h1>;
  }

  if (error) {
    return (
      <h1>
        {error.message || 'Something Went Wrong Please try after sometime...'}
      </h1>
    );
  }

  return (
    <div className="container mx-auto">
      {state.products.map((product) => {
        const addCartLoader = state.loading.find(
          (x) => x.type === 'ADD_CART_ITEM' && x.id === product.id,
        );
        const updateCartLoader = state.loading.find(
          (x) => x.type === 'UPDATE_CART_ITEM' && x.id === product.id,
        );
        const cartItem = state.cart.find((x) => x.productId === product.id);
        return (
          <Product
            key={product.id}
            product={product}
            addToCart={addToCart}
            addCartLoader={addCartLoader}
            updateToCart={updateToCart}
            cartItem={cartItem}
            updateCartLoader={updateCartLoader}
          />
        );
      })}
    </div>
  );
};

Home.displayName = 'Not Found';

export default Home;
