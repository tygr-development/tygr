import Vue from 'vue';

import Rx from 'rxjs/Rx';
import VueRx from 'vue-rx';

import App from './App';
import router from './router';
import { Store } from './store';
import './material';

import * as DeviceModule from './modules/device';
import * as RouterModule from './modules/router';

export default function() {
  Vue.use(
    VueRx,
    Rx,
  );

  const store = new Store();
  store.injectReducer(DeviceModule.reducer);
  store.runSaga(DeviceModule.saga);
  store.injectReducer(RouterModule.reducer);
  store.runSaga(RouterModule.saga(router));

  return new Vue({
    render: (h) => h(App),
    router,
    store,
  });
}
