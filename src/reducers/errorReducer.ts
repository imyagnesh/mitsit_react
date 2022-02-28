export type ErrorStateType = {
  type: string;
  message?: string;
  id?: number;
};

type ProductErrorAction = {
  type: 'LOAD_PRODUCTS_FAIL';
  payload: {
    message?: string;
    id?: never;
    error: Error;
  };
};

export type ErrorActions = ProductErrorAction;

export default (state: ErrorStateType[], { type, payload }: ErrorActions) => {
  console.log('error Reducer', type);

  const matches = /(.*)_(REQUEST|FAIL)/.exec(type);
  if (!matches) return state;
  const [, action, actionType] = matches;
  if (actionType === 'FAIL') {
    return [...state, { type: action, ...payload }];
  }
  return state.filter((x) => !(x.type === action && x.id === payload.id));
};
