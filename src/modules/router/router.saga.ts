import { Channel } from 'redux-saga';
import { call, put, take } from 'redux-saga/effects';

import { Route } from 'vue-router';

import * as Actions from './router.actions';
import Api from './router.api';

const routerSaga = (router: any) => function*() {
  const routeChannel: Channel<Route> = yield call(Api.getRouterChannel, router);

  while (true) {
    const route = yield take(routeChannel);
    yield put({...new Actions.RouteChanged(route)});
  }
};

export default routerSaga;
