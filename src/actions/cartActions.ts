import { AppDispatch } from 'configureStore';
import axiosInstance from 'utils/axiosInstance';

export const loadCartAction = () => async (dispatch: AppDispatch) => {
  try {
    dispatch({
      type: 'LOAD_CART_REQUEST',
      payload: { message: 'Loading Cart Items' },
    });
    const res = await axiosInstance.get<CartType[]>('cart');
    dispatch({
      type: 'LOAD_CART_SUCCESS',
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: 'LOAD_CART_FAIL',
      payload: {
        error: error as Error,
        message: 'Load Cart failed',
      },
    });
  }
};

export const b = 'b';
