import { AppDispatch } from 'configureStore';
import axiosInstance from 'utils/axiosInstance';

export const loadProductsAction = () => async (dispatch: AppDispatch) => {
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
  } catch (error) {
    dispatch({
      type: 'LOAD_PRODUCTS_FAIL',
      payload: {
        error: error as Error,
        message: 'Load Products failed',
      },
    });
  }
};

export const a = 'a';
