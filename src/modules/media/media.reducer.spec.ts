import { expect } from 'chai';

import * as Actions from './media.actions';
import { mediaReducer } from './media.reducer';

describe('mediaReducer', () => {

  it('sets initial state', () => {
    expect(mediaReducer(undefined, { type: '' }))
    .to.deep.equal({title: '', imgUrl: '', vidUrl: ''});
  });

  it('Sets image and title', () => {
    const state = mediaReducer(undefined, new Actions.SetImg('title', 'url'));
    expect(state.title).to.equal('title');
    expect(state.imgUrl).to.equal('url');
  });

  it('Sets video and title', () => {
    const state = mediaReducer(undefined, new Actions.SetVid('title', 'url'));
    expect(state.title).to.equal('title');
    expect(state.vidUrl).to.equal('url');
  });

  it('Unsets image and vid urls', () => {
    let state = { title: 'title', imgUrl: 'imgUrl', vidUrl: 'vidUrl' };
    state = mediaReducer(state, new Actions.Unset());
    expect(state).to.deep.equal({ title: '', imgUrl: '', vidUrl: '' });
  });
});
