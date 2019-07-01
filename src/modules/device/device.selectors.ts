import { Selector } from '../../store';

import { DEVICE } from './DEVICE';
import { Device, DeviceState } from './device.state';

const getState: Selector<DeviceState> = (state) => state[DEVICE];

export const getScreenSize: Selector<{ width: number, height: number }> = (state) => getState(state).screenSize;
export const getDevice: Selector<Device> = (state) => getState(state).device;

export const smallerOrEqTo: (device: Device) => Selector<boolean> = (device) => (state) => {
  switch (getDevice(state)) {

    case 'phone': if (device === 'phone') { return true; }
    case 'phablet': if (device === 'phablet') { return true; }
    case 'tablet': if (device === 'tablet') { return true; }
    case 'desktop': if (device === 'desktop') { return true; }

    default: return false;
  }
};
