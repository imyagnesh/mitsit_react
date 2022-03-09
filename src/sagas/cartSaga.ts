import { AxiosResponse } from 'axios';
import {
  all,
  call,
  fork,
  put,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';
import axiosInstance from 'utils/axiosInstance';

function* loadCart() {
  try {
    const res: AxiosResponse<CartType[]> = yield call(
      axiosInstance.get,
      'cart',
    );
    yield put({ type: 'LOAD_CART_SUCCESS', payload: res.data });
  } catch (error) {
    yield put({
      type: 'LOAD_CART_FAIL',
      payload: {
        error: error as Error,
        message: 'Load Products failed',
      },
    });
  }
}

type AddToCartType = {
  type: 'ADD_CART_ITEM_REQUEST';
  payload: {
    productId: number;
    quantity: number;
  };
};

function* addToCart({ payload: { productId, quantity } }: AddToCartType) {
  try {
    const res: AxiosResponse<CartType> = yield call(
      axiosInstance.post,
      'cart',
      {
        productId,
        quantity,
      },
    );
    yield put({
      type: 'ADD_CART_ITEM_SUCCESS',
      payload: { ...res.data, loaderId: productId },
    });
  } catch (error) {
    yield put({
      type: 'ADD_CART_ITEM_FAIL',
      payload: {
        loaderId: productId,
        error: error as Error,
        message: 'Item not added to cart',
      },
    });
  }
}

type UpdateToCartType = {
  type: 'UPDATE_CART_ITEM_REQUEST';
  payload: {
    cartItem: CartType;
  };
};

function* updateToCart({ payload: { cartItem } }: UpdateToCartType) {
  try {
    const res: AxiosResponse<CartType> = yield call(
      axiosInstance.put,
      `cart/${cartItem.id}`,
      cartItem,
    );
    yield put({
      type: 'UPDATE_CART_ITEM_SUCCESS',
      payload: { ...res.data, loaderId: cartItem.productId },
    });
  } catch (error) {
    yield put({
      type: 'UPDATE_CART_ITEM_FAIL',
      payload: {
        loaderId: cartItem.productId,
        error: error as Error,
        message: 'Updating Item fail',
      },
    });
  }
}

type DeleteItemType = {
  type: 'DELETE_CART_ITEM_REQUEST';
  payload: {
    cartItem: CartType;
  };
};

function* deleteItem({ payload: { cartItem } }: DeleteItemType) {
  try {
    const res: AxiosResponse<CartType> = yield call(
      axiosInstance.delete,
      `cart/${cartItem.id}`,
    );
    yield put({
      type: 'DELETE_CART_ITEM_SUCCESS',
      payload: { ...cartItem, loaderId: cartItem.productId },
    });
  } catch (error) {
    yield put({
      type: 'DELETE_CART_ITEM_FAIL',
      payload: {
        loaderId: cartItem.productId,
        error: error as Error,
        message: 'Unable to remove item from cart....',
      },
    });
  }
}

function* loadCartRequest() {
  yield takeEvery('LOAD_CART_REQUEST', loadCart);
}

function* addToCartRequest() {
  yield takeLatest('ADD_CART_ITEM_REQUEST', addToCart);
}

function* updateToCartRequest() {
  yield takeLatest('UPDATE_CART_ITEM_REQUEST', updateToCart);
}

function* deleteItemRequest() {
  yield takeLatest('DELETE_CART_ITEM_REQUEST', deleteItem);
}

export default function* rootCart() {
  yield all([
    fork(loadCartRequest),
    fork(addToCartRequest),
    fork(updateToCartRequest),
    fork(deleteItemRequest),
  ]);
}
