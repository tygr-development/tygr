import { ReducersMapObject } from 'redux';

import { ROUTER } from './ROUTER';
import routerReducer from './router.reducer';
import saga from './router.saga';

const reducer: ReducersMapObject = {
  [ROUTER]: routerReducer,
};

export * from './router.actions';
export * from './router.selectors';
export { reducer, saga };
