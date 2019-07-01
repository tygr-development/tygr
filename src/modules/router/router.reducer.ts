import { Reducer } from 'redux';

import * as Actions from './router.actions';
import { initialState, RouterState } from './router.state';

const routerReducer: Reducer<RouterState> = (state = initialState, action) => {
  switch (action.type) {
    case Actions.ROUTE_CHANGED:
      return { ...state, route: action.route };
    default: return state;
  }
};

export default routerReducer;
