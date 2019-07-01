import { Action } from 'redux';

export const SCREEN_SIZE_CHANGE = 'device: Screen Size Change';
export class ScreenSizeChange implements Action {
  public readonly type = SCREEN_SIZE_CHANGE;
  constructor(public size: { width: number, height: number}) { }
}
