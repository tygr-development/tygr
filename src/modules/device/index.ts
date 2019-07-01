import { ReducersMapObject } from 'redux';

export * from './device.actions';
export * from './device.selectors';

import { DEVICE } from './DEVICE';
import deviceReducer from './device.reducer';
import saga from './device.saga';

export const reducer: ReducersMapObject = {
  [DEVICE]: deviceReducer,
};

export { saga };
