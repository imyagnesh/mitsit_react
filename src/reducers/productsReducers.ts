export type ProductsActions = {
  type: 'LOAD_PRODUCTS_SUCCESS';
  payload: ProductType[];
};

export default (state: ProductType[], { type, payload }: ProductsActions) => {
  switch (type) {
    case 'LOAD_PRODUCTS_SUCCESS':
      return payload;

    default:
      return state;
  }
};
