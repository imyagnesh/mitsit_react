import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import { ErrorStateType } from 'reducers/errorReducer';
import { LoadingStateType } from 'reducers/loadingReducer';
import rootReducer, { initialRootState } from 'reducers/rootReducer';
import axiosInstance from 'utils/axiosInstance';

type CartValueType = {
  cart: CartType[];
  loading: LoadingStateType[];
  error: ErrorStateType[];
};

type CartContextType = {
  cartState: CartValueType;
  loadCart: () => Promise<void>;
  addToCart: (productId: number, quantity: number) => Promise<void>;
  updateToCart: (cartItem: CartType) => Promise<void>;
  deleteItem: (cartItem: CartType) => Promise<void>;
};

const CartContext = createContext<CartContextType>({} as CartContextType);

export const CartProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialRootState);

  const loadCart = useCallback(async () => {
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
          error: error as Error,
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
          error: error as Error,
          message: 'Updating Item fail',
        },
      });
    }
  }, []);

  const deleteItem = useCallback(async (cartItem: CartType) => {
    try {
      dispatch({
        type: 'DELETE_CART_ITEM_REQUEST',
        payload: {
          id: cartItem.productId,
          message: 'Deleting Item From Cart',
        },
      });
      await axiosInstance.delete(`cart/${cartItem.id}`);
      dispatch({
        type: 'DELETE_CART_ITEM_SUCCESS',
        payload: cartItem,
      });
    } catch (error) {
      dispatch({
        type: 'DELETE_CART_ITEM_FAIL',
        payload: {
          id: cartItem.productId,
          error: error as Error,
          message: 'Unable to remove item from cart....',
        },
      });
    }
  }, []);

  const value = useMemo(
    () => ({
      cartState: {
        cart: state.cart,
        loading: state.loading,
        error: state.error,
      },
      loadCart,
      addToCart,
      updateToCart,
      deleteItem,
    }),
    [
      state.cart,
      state.error,
      state.loading,
      loadCart,
      addToCart,
      updateToCart,
      deleteItem,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
