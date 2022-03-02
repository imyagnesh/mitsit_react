import cartReducer, { CartActionType } from './cartReducer';
import errorReducer, { ErrorActions, ErrorStateType } from './errorReducer';
import loadingReducer, {
  LoadingActions,
  LoadingStateType,
} from './loadingReducer';
import productsReducers, { ProductsActions } from './productsReducers';

type InitRootStateType = {
  products: ProductType[];
  loading: LoadingStateType[];
  error: ErrorStateType[];
  cart: CartType[];
};

export const initialRootState = {
  products: [],
  loading: [],
  error: [],
  cart: [],
};

type RootActions =
  | ProductsActions
  | ErrorActions
  | LoadingActions
  | CartActionType;

export default (state: InitRootStateType, action: RootActions) => ({
  products: productsReducers(state.products, action as ProductsActions),
  loading: loadingReducer(state.loading, action as LoadingActions),
  error: errorReducer(state.error, action as ErrorActions),
  cart: cartReducer(state.cart, action as CartActionType),
});
