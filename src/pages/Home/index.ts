import { loadCartAction } from 'actions/cartActions';
import { loadProductsAction } from 'actions/productsActions';
import { AppDispatch } from 'configureStore';
import { connect } from 'react-redux';
import { RootState } from 'reducers';
import Home from './Home';

const mapStateToProps = (state: RootState) => ({
  products: state.products,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  loadProducts: () => loadProductsAction()(dispatch),
  loadCart: () => loadCartAction()(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
