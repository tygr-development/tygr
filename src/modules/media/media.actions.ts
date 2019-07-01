import { Action } from 'redux';

export const SET_IMG = 'media: Set Image';
export class SetImg implements Action {
  public readonly type = SET_IMG;
  constructor(public title: string, public url: string) { }
}

export const SET_VID = 'media: Set Video';
export class SetVid implements Action {
  public readonly type = SET_VID;
  constructor(public title: string, public url: string) { }
}

export const UNSET = 'media: Unset';
export class Unset implements Action {
  public readonly type = UNSET;
}
