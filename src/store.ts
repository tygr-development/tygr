import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { bindCallback } from 'rxjs/observable/bindCallback';
import { fromEventPattern } from 'rxjs/observable/fromEventPattern';

import * as redux from 'redux';
import createSagaMiddleware from 'redux-saga';

import Vue from 'vue';

Vue.mixin({
  beforeCreate() {
    const options = this.$options;
    // store injection
    if (options.store) {
        this.$store = options.store;
    } else if (options.parent && options.parent.$store) {
        this.$store = options.parent.$store;
    }
  },
});

export type Selector<T> = (state: any) => T;

declare var window: any;
const composeEnhancers =
  ((process.env.NODE_ENV !== 'production' || process.env.BRANCH === 'beta') && typeof window !== 'undefined')
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || redux.compose
    : redux.compose;

export class Store implements redux.Store<any> {

  private store: redux.Store<any>;

  private reducers: redux.ReducersMapObject = {};

  private sagaMiddleware = createSagaMiddleware();

  constructor() {
    this.store = redux.createStore(
      this.getReducer(),
      composeEnhancers(
        redux.applyMiddleware(this.sagaMiddleware),
      ),
    );
  }

  public select<T>(selector: Selector<T>): T {
    return selector(this.getState());
  }

  public select$<T>(selector: Selector<T>): Observable<T> {
    let unsubscribe: any;
    return fromEventPattern(
      (handler: any) => unsubscribe = this.subscribe(handler),
      () => unsubscribe(),
      () => selector(this.getState()),
    );
  }

  public dispatch(action: any) {
    return this.store.dispatch({ ...action });
  }

  public getState() {
    return this.store.getState();
  }

  public subscribe(listener: () => void) {
    return this.store.subscribe(listener);
  }

  public replaceReducer(reducer: redux.Reducer<any>) {
    return this.store.replaceReducer(reducer);
  }

  public injectReducer(reducerMap: redux.ReducersMapObject) {
    this.reducers = { ...this.reducers, ...reducerMap };
    this.replaceReducer(this.getReducer());
  }

  public runSaga(saga: any) {
    this.sagaMiddleware.run(saga);
  }

  private getReducer(): redux.Reducer<any> {

    return Object.keys(this.reducers).length > 0
      ? redux.combineReducers(this.reducers)
      : (state, action) => state;
  }
}
