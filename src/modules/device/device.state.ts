export type Device =
  'phone'
  | 'phablet'
  | 'tablet'
  | 'desktop';

export interface DeviceState {
  screenSize: { width: number, height: number };
  device: Device;
}

export const initialState: DeviceState = {
  device: 'desktop',
  screenSize: { width: 1920, height: 1080 },
};
