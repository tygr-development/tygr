import { Reducer } from 'redux';
import * as Actions from './media.actions';
import { initialState, MediaState } from './media.state';

export const mediaReducer: Reducer<MediaState> = (state = initialState, action) => {
  switch (action.type) {

    case Actions.SET_IMG:
      return { ...state, title: action.title, imgUrl: action.url, vidUrl: '' };

    case Actions.SET_VID:
      return { ...state, title: action.title, vidUrl: action.url, imgUrl: '' };

    case Actions.UNSET: return initialState;

    default: return state;
  }
};
