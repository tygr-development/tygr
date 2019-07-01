import { expect } from 'chai';

import * as Actions from './device.actions';
import reducer from './device.reducer';

describe('deviceReducer', () => {

  it('Sets initial state', () => {

    expect(reducer(undefined, { type: '' })).to.deep.equal({
      device: 'desktop',
      screenSize: { width: 1920, height: 1080 },
    });

  });

  it('Correctly sets device baed on screen size', () => {

    const phone = { width: 480, height: 720 };
    const phablet = { width: 720, height: 1080 };
    const tablet = { width: 920, height: 1560 };
    const desktop = { width: 1920, height: 1080 };

    let state = reducer(undefined, new Actions.ScreenSizeChange(phone));
    expect(state.device).to.equal('phone');

    state = reducer(state, new Actions.ScreenSizeChange(phablet));
    expect(state.device).to.equal('phablet');

    state = reducer(state, new Actions.ScreenSizeChange(tablet));
    expect(state.device).to.equal('tablet');

    state = reducer(state, new Actions.ScreenSizeChange(desktop));
    expect(state.device).to.equal('desktop');
  });
});
