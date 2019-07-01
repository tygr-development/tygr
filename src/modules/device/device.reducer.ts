import { Reducer } from 'redux';

import * as Actions from './device.actions';
import { Device, DeviceState, initialState } from './device.state';

const deviceReducer: Reducer<DeviceState> = (state = initialState, action) => {
  switch (action.type) {

    case Actions.SCREEN_SIZE_CHANGE:
      let device: Device;
      if (action.size.width <= 480) {
        device = 'phone';
      } else if ( action.size.width <= 839 ) {
        device = 'phablet';
      } else if ( action.size.width <= 1024 ) {
        device = 'tablet';
      } else {
        device = 'desktop';
      }

      return { ...state, screenSize: action.size, device };

    default: return state;
  }
};

export default deviceReducer;
