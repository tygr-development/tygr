import { ReducersMapObject } from 'redux';

import { MEDIA } from './MEDIA';
import { mediaReducer } from './media.reducer';

export const reducer: ReducersMapObject = {
  [MEDIA]: mediaReducer,
};

export * from './media.selectors';
export * from './media.actions';
