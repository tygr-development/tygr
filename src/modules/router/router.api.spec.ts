import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';

import Api from './router.api';

describe('Router Api', () => {

  describe('getRouterChannel', () => {

    it('returns a channel that emits a new route on afterEach callback', (done) => {

      const channel = Api.getRouterChannel({
        afterEach(cb) {
          setTimeout(() => cb({
            matched: 'matched',
            route: 'route 1',
          }), 10);
          setTimeout(() => cb({
            matched: 'matched',
            route: 'route 2',
          }), 20);
        },
      });

      const chanSpy = sinon.spy();
      channel.take(chanSpy);
      channel.take(chanSpy);

      setTimeout(() => {
        expect(chanSpy).calledTwice;
        expect(chanSpy).calledWith({ route: 'route 1' });
        expect(chanSpy).calledWith({ route: 'route 2' });
        expect(chanSpy).not.calledWith({ matched: 'matched' });
        done();
      }, 30);
    });
  });
});
