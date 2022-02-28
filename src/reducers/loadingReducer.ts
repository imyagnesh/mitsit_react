export type LoadingStateType = {
  type: string;
  message?: string;
  id?: number;
};

type ProductLoadingAction = {
  type: 'LOAD_PRODUCTS_REQUEST';
  payload: {
    message?: string;
    id?: never;
  };
};

export type LoadingActions = ProductLoadingAction;

export default (
  state: LoadingStateType[],
  { type, payload }: LoadingActions,
) => {
  console.log('loading Reducer', type);
  const matches = /(.*)_(REQUEST|SUCCESS|FAIL)/.exec(type);
  if (!matches) return state;
  const [, action, actionType] = matches;
  if (actionType === 'REQUEST') {
    return [...state, { type: action, ...payload }];
  }
  return state.filter((x) => !(x.type === action && x.id === payload.id));
};
