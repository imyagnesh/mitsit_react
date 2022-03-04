import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from 'react';
import { ErrorStateType } from 'reducers/errorReducer';
import { LoadingStateType } from 'reducers/loadingReducer';
import rootReducer, { initialRootState } from 'reducers/rootReducer';
import axiosInstance from 'utils/axiosInstance';

type ProductsValueType = {
  products: ProductType[];
  loading: LoadingStateType[];
  error: ErrorStateType[];
};

type ProductsContextType = {
  productsState: ProductsValueType;
  loadProducts: () => Promise<void>;
};

const ProductsContext = createContext<ProductsContextType>(
  {} as ProductsContextType,
);

export const ProductsProvider: FC = ({ children }) => {
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
    } catch (error) {
      dispatch({
        type: 'LOAD_PRODUCTS_FAIL',
        payload: {
          error: error as Error,
          message: 'Load Products failed',
        },
      });
    }
  }, []);

  const value = useMemo(
    () => ({
      productsState: {
        products: state.products,
        loading: state.loading,
        error: state.error,
      },
      loadProducts,
    }),
    [state.products, state.loading, state.error, loadProducts],
  );

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);
