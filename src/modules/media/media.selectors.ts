import { Selector } from '../../store';
import { MediaState } from './media.state';
import { MEDIA } from './MEDIA';

const getState: Selector<MediaState> = (state) => state[MEDIA];

export const getTitle: Selector<string> = (state) => getState(state).title;
export const getImgUrl: Selector<string> = (state) => getState(state).imgUrl;
export const getVidUrl: Selector<string> = (state) => getState(state).vidUrl;
