export type ProductsActions = {
  type: 'LOAD_PRODUCTS_SUCCESS';
  payload: ProductType[];
};

export default (state: ProductType[], { type, payload }: ProductsActions) => {
  console.log('product Reducer', type);
  switch (type) {
    case 'LOAD_PRODUCTS_SUCCESS':
      return payload;

    default:
      return state;
  }
};
