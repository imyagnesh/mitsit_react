import { combineReducers } from 'redux';
import cart from './cartReducer';
import products from './productsReducers';
import error from './errorReducer';
import loading from './loadingReducer';

const rootReducer = combineReducers({
  cart,
  products,
  error,
  loading,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
