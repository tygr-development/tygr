import { expect } from 'chai';

import { call, put } from 'redux-saga/effects';
import { cloneableGenerator } from '@redux-saga/testing-utils';

import * as Actions from './device.actions';
import Api from './device.api';
import * as Sagas from './device.saga';

describe('Device Saga', () => {

  let gen;

  describe('screenSize', () => {

    before(() => {
      gen = cloneableGenerator(Sagas.screenSize)();
    });

    it('Gets screen resize channel', () => {
      expect(
        gen.next().value,
      ).to.deep.equal(
        call(Api.getResizeChannel),
      );
    });

    it('Calls getScreenSize', () => {
      expect(
        gen.next('hi').value,
      ).to.deep.equal(
        call(Api.getScreenSize),
      );
    });

    it('puts screensizechange whenever resize channel emits', () => {
      const size = { width: 0, height: 0 };

      expect(
        gen.next(size).value,
      ).to.deep.equal(
        put({...new Actions.ScreenSizeChange(size)}),
      );

      gen.next(true);

      expect(
        gen.next().value,
      ).to.deep.equal(
        call(Api.getScreenSize),
      );
    });
  });

});
