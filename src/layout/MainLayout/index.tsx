import { connect } from 'react-redux';
import { RootState } from 'reducers';
import MainLayout from './MainLayout';

const mapStateToProps = (state: RootState) => ({
  cartCount: state.cart.reduce((p, c) => p + c.quantity, 0),
});

export default connect(mapStateToProps)(MainLayout);
