import { call, put, take} from 'redux-saga/effects';

import * as Actions from './device.actions';
import Api from './device.api';

export function* screenSize() {
  const screenSizeChan = yield call(Api.getResizeChannel);

  while (true) {
    const newSize = yield call(Api.getScreenSize);
    yield put({...new Actions.ScreenSizeChange(newSize)});
    yield take(screenSizeChan);
  }
}

export function* deviceSaga() {
  yield call(screenSize);
}

export default deviceSaga;
