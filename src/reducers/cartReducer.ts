type LoadCartSuccessType = {
  type: 'LOAD_CART_SUCCESS';
  payload: CartType[];
};

type AddCartItemSuccessType = {
  type: 'ADD_CART_ITEM_SUCCESS';
  payload: CartType;
};

type UpdateCartItemSuccessType = {
  type: 'UPDATE_CART_ITEM_SUCCESS';
  payload: CartType;
};

type DeleteCartItemSuccessType = {
  type: 'DELETE_CART_ITEM_SUCCESS';
  payload: CartType;
};

export type CartActionType =
  | LoadCartSuccessType
  | AddCartItemSuccessType
  | UpdateCartItemSuccessType
  | DeleteCartItemSuccessType;

// eslint-disable-next-line default-param-last
export default (state: CartType[] = [], { type, payload }: CartActionType) => {
  switch (type) {
    case 'LOAD_CART_SUCCESS':
      return payload as CartType[];

    case 'ADD_CART_ITEM_SUCCESS':
      return [...state, payload as CartType];

    case 'UPDATE_CART_ITEM_SUCCESS': {
      const index = state.findIndex((x) => x.id === (payload as CartType).id);
      return [
        ...state.slice(0, index),
        payload as CartType,
        ...state.slice(index + 1),
      ];
    }

    case 'DELETE_CART_ITEM_SUCCESS': {
      const index = state.findIndex((x) => x.id === (payload as CartType).id);
      return [...state.slice(0, index), ...state.slice(index + 1)];
    }

    default:
      return state;
  }
};
