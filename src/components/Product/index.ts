import { connect } from 'react-redux';
import { RootState } from 'reducers';
import { AppDispatch } from 'configureStore';
import {
  addToCartAction,
  deleteItemAction,
  updateToCartAction,
} from 'actions/cartActions';
import Product, { ProductProps, ProductStoreProps } from './Product';

const mapStateToProps = (
  state: RootState,
  props: Omit<ProductProps, keyof ProductStoreProps>,
) => ({
  addCartLoader: state.loading.find(
    (x) => x.type === 'ADD_CART_ITEM' && x.loaderId === props.product.id,
  ),
  updateCartLoader: state.loading.find(
    (x) => x.type === 'UPDATE_CART_ITEM' && x.loaderId === props.product.id,
  ),
  deleteCartLoader: state.loading.find(
    (x) => x.type === 'DELETE_CART_ITEM' && x.loaderId === props.product.id,
  ),
  cartItem: state.cart.find((x) => x.productId === props.product.id),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  addToCart: (productId: number, quantity: number) =>
    addToCartAction(productId, quantity)(dispatch),
  updateToCart: (cartItem: CartType) => updateToCartAction(cartItem)(dispatch),
  deleteItem: (cartItem: CartType) => deleteItemAction(cartItem)(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);
