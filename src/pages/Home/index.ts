// import { loadCartAction } from 'actions/cartActions';
// import { loadProductsAction } from 'actions/productsActions';
import { AppDispatch } from 'configureStore';
import { connect } from 'react-redux';
import { RootState } from 'reducers';
import Home from './Home';

const mapStateToProps = (state: RootState) => ({
  products: state.products,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  loadProducts: () =>
    dispatch({
      type: 'LOAD_PRODUCTS_REQUEST',
      payload: { message: 'Loading Products' },
    }),
  loadCart: () =>
    dispatch({
      type: 'LOAD_CART_REQUEST',
      payload: { message: 'Loading Products' },
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
