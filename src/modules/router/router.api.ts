import { EventChannel, eventChannel} from 'redux-saga';

import { Route } from 'vue-router';

export default class RouterApi {
  public static getRouterChannel(router: any): EventChannel<Route> {

    return eventChannel((emitter) => {
      router.afterEach((to: any) => {

        // Route#matched is not a plain json object
        const route = {...to};
        delete route.matched;

        emitter(route);
      });
      return () => {};
    });
  }
}
