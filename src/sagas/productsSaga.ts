import { AxiosResponse } from 'axios';
import { takeEvery, call, put } from 'redux-saga/effects';
import axiosInstance from 'utils/axiosInstance';

function* loadProducts() {
  try {
    const res: AxiosResponse<ProductType[]> = yield call(
      axiosInstance.get,
      'products',
    );
    yield put({ type: 'LOAD_PRODUCTS_SUCCESS', payload: res.data });
  } catch (error) {
    yield put({
      type: 'LOAD_PRODUCTS_FAIL',
      payload: {
        error: error as Error,
        message: 'Load Products failed',
      },
    });
  }
}

export default function* rootProducts() {
  yield takeEvery('LOAD_PRODUCTS_REQUEST', loadProducts);
}
