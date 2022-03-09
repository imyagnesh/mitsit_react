import { connect } from 'react-redux';
import { RootState } from 'reducers';
import { AppDispatch } from 'configureStore';
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
    dispatch({
      type: 'ADD_CART_ITEM_REQUEST',
      payload: {
        productId,
        quantity,
        loaderId: productId,
        message: 'Adding Item in the cart',
      },
    }),
  updateToCart: (cartItem: CartType) =>
    dispatch({
      type: 'UPDATE_CART_ITEM_REQUEST',
      payload: {
        cartItem,
        loaderId: cartItem.productId,
        message: 'Updating Cart Item',
      },
    }),
  deleteItem: (cartItem: CartType) =>
    dispatch({
      type: 'DELETE_CART_ITEM_REQUEST',
      payload: {
        cartItem,
        loaderId: cartItem.productId,
        message: 'Deleting Item From Cart',
      },
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);
