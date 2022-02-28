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
};

export const initialRootState = {
  products: [],
  loading: [],
  error: [],
};

type RootActions = ProductsActions | ErrorActions | LoadingActions;

export default (state: InitRootStateType, action: RootActions) => ({
  products: productsReducers(state.products, action as ProductsActions),
  loading: loadingReducer(state.loading, action as LoadingActions),
  error: errorReducer(state.error, action as ErrorActions),
});
