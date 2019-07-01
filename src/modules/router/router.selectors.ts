import { Selector } from '../../store';
import { ROUTER } from './ROUTER';
import { RouterState } from './router.state';

const getState: Selector<RouterState> = (state) => state[ROUTER];

export const getPath: Selector<string> = (state) => {
  const route = getState(state).route;
  if (route) {
    return route.path;
  }
  return '';
};
