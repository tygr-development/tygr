import { Action } from 'redux';

import { Route } from 'vue-router';

export const ROUTE_CHANGED = 'router: Route Changed';
export class RouteChanged implements Action {
  public readonly type = ROUTE_CHANGED;
  constructor(public route: Route) { }
}
