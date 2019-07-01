import { expect } from 'chai';

import * as Selectors from './device.selectors';

describe('Device Selectors', () => {

  describe('smallerOrEqTo', () => {

    it('returns true for all devices if desktop', () => {
      const selector = Selectors.smallerOrEqTo('desktop');

      expect(selector({device: { device: 'phone' }})).to.be.true;
      expect(selector({device: { device: 'phablet' }})).to.be.true;
      expect(selector({device: { device: 'tablet' }})).to.be.true;
      expect(selector({device: { device: 'desktop' }})).to.be.true;

    });

    it('returns false for all devices except phone if phone', () => {
      const selector = Selectors.smallerOrEqTo('phone');

      expect(selector({device: { device: 'phone' }})).to.be.true;
      expect(selector({device: { device: 'phablet' }})).to.be.false;
      expect(selector({device: { device: 'tablet' }})).to.be.false;
      expect(selector({device: { device: 'desktop' }})).to.be.false;
    });

    it('returns false for all devices bigger than tablet if table', () => {
      const selector = Selectors.smallerOrEqTo('tablet');

      expect(selector({device: { device: 'phone' }})).to.be.true;
      expect(selector({device: { device: 'phablet' }})).to.be.true;
      expect(selector({device: { device: 'tablet' }})).to.be.true;
      expect(selector({device: { device: 'desktop' }})).to.be.false;
    });
  });
});
