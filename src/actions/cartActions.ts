import { AppDispatch } from 'configureStore';
import axiosInstance from 'utils/axiosInstance';

// to get a data and pass data to reducer

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

export const addToCartAction =
  (productId: number, quantity: number) => async (dispatch: AppDispatch) => {
    try {
      dispatch({
        type: 'ADD_CART_ITEM_REQUEST',
        payload: {
          loaderId: productId,
          message: 'Adding Item in the cart',
        },
      });
      const res = await axiosInstance.post<CartType>('cart', {
        productId,
        quantity,
      });

      dispatch({
        type: 'ADD_CART_ITEM_SUCCESS',
        payload: { ...res.data, loaderId: productId },
      });
    } catch (error) {
      dispatch({
        type: 'ADD_CART_ITEM_FAIL',
        payload: {
          loaderId: productId,
          error: error as Error,
          message: 'Item not added to cart',
        },
      });
    }
  };

export const updateToCartAction =
  (cartItem: CartType) => async (dispatch: AppDispatch) => {
    try {
      dispatch({
        type: 'UPDATE_CART_ITEM_REQUEST',
        payload: {
          loaderId: cartItem.productId,
          message: 'Updating Cart Item',
        },
      });
      const res = await axiosInstance.put(`cart/${cartItem.id}`, cartItem);
      dispatch({
        type: 'UPDATE_CART_ITEM_SUCCESS',
        payload: { ...res.data, loaderId: cartItem.productId },
      });
    } catch (error) {
      dispatch({
        type: 'UPDATE_CART_ITEM_FAIL',
        payload: {
          loaderId: cartItem.productId,
          error: error as Error,
          message: 'Updating Item fail',
        },
      });
    }
  };

export const deleteItemAction =
  (cartItem: CartType) => async (dispatch: AppDispatch) => {
    try {
      dispatch({
        type: 'DELETE_CART_ITEM_REQUEST',
        payload: {
          loaderId: cartItem.productId,
          message: 'Deleting Item From Cart',
        },
      });
      await axiosInstance.delete(`cart/${cartItem.id}`);
      dispatch({
        type: 'DELETE_CART_ITEM_SUCCESS',
        payload: { ...cartItem, loaderId: cartItem.productId },
      });
    } catch (error) {
      dispatch({
        type: 'DELETE_CART_ITEM_FAIL',
        payload: {
          loaderId: cartItem.productId,
          error: error as Error,
          message: 'Unable to remove item from cart....',
        },
      });
    }
  };
