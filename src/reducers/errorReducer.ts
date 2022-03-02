export type ErrorStateType = {
  type: string;
  error: Error;
  message?: string;
  id?: number;
};

type ErrorPayload = {
  message?: string;
  id?: never;
  error: Error;
};

type ErrorPayloadWithID = {
  message?: string;
  error: Error;
  id: number;
};

type ProductErrorAction = {
  type: 'LOAD_PRODUCTS_FAIL';
  payload: ErrorPayload;
};

type CartLoadingAction = {
  type: 'LOAD_CART_FAIL';
  payload: ErrorPayload;
};

type AddCartItemAction = {
  type: 'ADD_CART_ITEM_FAIL';
  payload: ErrorPayloadWithID;
};

type UpdateCartItemAction = {
  type: 'UPDATE_CART_ITEM_FAIL';
  payload: ErrorPayloadWithID;
};

export type ErrorActions =
  | ProductErrorAction
  | CartLoadingAction
  | AddCartItemAction
  | UpdateCartItemAction;

export default (state: ErrorStateType[], { type, payload }: ErrorActions) => {
  const matches = /(.*)_(REQUEST|FAIL)/.exec(type);
  if (!matches) return state;
  const [, action, actionType] = matches;
  if (actionType === 'FAIL') {
    return [...state, { type: action, ...payload }];
  }
  return state.filter((x) => !(x.type === action && x.id === payload.id));
};
