import React, { useCallback, useEffect, useReducer } from 'react';
import rootReducer, { initialRootState } from 'reducers/rootReducer';
import axiosInstance from 'utils/axiosInstance';

type Props = {};

const Home = (props: Props) => {
  const [state, dispatch] = useReducer(rootReducer, initialRootState);

  const loadProducts = useCallback(async () => {
    try {
      dispatch({
        type: 'LOAD_PRODUCTS_REQUEST',
        payload: { message: 'Loading Products' },
      });
      const res = await axiosInstance.get<ProductType[]>('products');
      dispatch({
        type: 'LOAD_PRODUCTS_SUCCESS',
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: 'LOAD_PRODUCTS_FAIL',
        payload: {
          error: err as Error,
          message: 'Load Products failed',
        },
      });
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return <div>Home</div>;
};

Home.displayName = 'Not Found';

export default Home;
