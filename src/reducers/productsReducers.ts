export type ProductsActions = {
  type: 'LOAD_PRODUCTS_SUCCESS';
  payload: ProductType[];
};

export default (
  // eslint-disable-next-line default-param-last
  state: ProductType[] = [],
  { type, payload }: ProductsActions,
) => {
  switch (type) {
    case 'LOAD_PRODUCTS_SUCCESS':
      return payload;

    default:
      return state;
  }
};
