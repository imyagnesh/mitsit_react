import { RootState } from 'reducers';
import { Middleware } from 'redux';

const logger: Middleware<{}, RootState> =
  (storeAPI) => (next) => async (action) => {
    const matches = /(.*)_(LOAD)/.exec(action.type);

    if (matches) {
      // make api call
      // console.log(action);
      // next(action);
    } else {
      // next(action);
    }
    next(action);
  };

export default logger;
