import { Route } from 'vue-router';

export interface RouterState {
  route: Route | null;
}

export const initialState: RouterState = {
  route: null,
};
