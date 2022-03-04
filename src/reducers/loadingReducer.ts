export type LoadingStateType = {
  type: string;
  message?: string;
  id?: number;
};

type LoadingPayload = {
  message?: string;
  id?: never;
};

type LoadingPayloadWithID = {
  message?: string;
  id: number;
};

type ProductLoadingAction = {
  type: 'LOAD_PRODUCTS_REQUEST';
  payload: LoadingPayload;
};

type CartLoadingAction = {
  type: 'LOAD_CART_REQUEST';
  payload: LoadingPayload;
};

type AddCartItemAction = {
  type: 'ADD_CART_ITEM_REQUEST';
  payload: LoadingPayloadWithID;
};

type UpdateCartItemAction = {
  type: 'UPDATE_CART_ITEM_REQUEST';
  payload: LoadingPayloadWithID;
};

type DeleteCartItemAction = {
  type: 'DELETE_CART_ITEM_REQUEST';
  payload: LoadingPayloadWithID;
};

export type LoadingActions =
  | ProductLoadingAction
  | CartLoadingAction
  | AddCartItemAction
  | UpdateCartItemAction
  | DeleteCartItemAction;

export default (
  // eslint-disable-next-line default-param-last
  state: LoadingStateType[] = [],
  { type, payload }: LoadingActions,
) => {
  const matches = /(.*)_(REQUEST|SUCCESS|FAIL)/.exec(type);
  if (!matches) return state;
  const [, action, actionType] = matches;
  if (actionType === 'REQUEST') {
    return [...state, { type: action, ...payload }];
  }
  return state.filter((x) => !(x.type === action && x.id === payload.id));
};
