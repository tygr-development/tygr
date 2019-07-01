import * as sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { use, expect } from 'chai';

import Api from './device.api';

use(sinonChai);

declare var global: any;

describe('Device Api', () => {

  before(() => {
    global.window = {
      addEventListener() {},
      removeEventListener() {},
      innerHeight: 0,
      innerWidth: 0,
    };
  });

  describe('getResizeChannel', () => {

    let addStub: sinon.SinonStub;

    before(() => {
      addStub = sinon.stub(global.window, 'addEventListener');
    });

    afterEach(() => {
      addStub.reset();
    });

    after(() => {
      addStub.restore();
    });

    it('Adds event listener to window resize event', () => {
      Api.getResizeChannel();
      expect(addStub).calledWith('resize');
    });

    it('Returns a channel that emits values whenever resize event', (done) => {

      addStub.callsFake((event, listener) => {
        setTimeout(listener, 10);
        setTimeout(listener, 20);
      });

      const channel = Api.getResizeChannel();
      const chanSpy = sinon.spy();
      channel.take(chanSpy);
      channel.take(chanSpy);

      setTimeout(() => {
        expect(chanSpy).calledTwice;
        done();
      }, 30);

    });

    it('Removes event listener on channel close', () => {
      const channel = Api.getResizeChannel();

      const removeSpy = sinon.spy(global.window, 'removeEventListener');
      channel.close();
      expect(removeSpy).calledWith('resize');
    });
  });

});
