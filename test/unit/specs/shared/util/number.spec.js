import {
  isInteger,
  isPositiveInteger,
  isFloat,
  isPositiveFloat,
  integerFilter,
  floatFilter,
} from 'src/shared/util/number';

describe('utils/number', () => {

  describe('isInteger()', () => {
    it('', () => {
      expect(isInteger(1234)).toBe(true);
      expect(isInteger(-1234)).toBe(true);
      expect(isInteger('3')).toBe(true);
      expect(isInteger('-3')).toBe(true);
      expect(isInteger('+a#!@#3')).toBe(false);
      expect(isInteger(1234.234)).toBe(false);
      expect(isInteger(-1234.234)).toBe(false);
      expect(isInteger('3.234')).toBe(false);
      expect(isInteger('-3.234')).toBe(false);
      expect(isInteger(Number.MIN_VALUE)).toBe(false);
      expect(isInteger(Infinity)).toBe(false);
    });
  });

  describe('isPositiveInteger()', () => {
    it('', () => {
      expect(isPositiveInteger(1234)).toBe(true);
      expect(isPositiveInteger('3')).toBe(true);
      expect(isPositiveInteger('+a#!@#3')).toBe(false);
      expect(isPositiveInteger(1234.234)).toBe(false);
      expect(isPositiveInteger('3.234')).toBe(false);
      expect(isPositiveInteger('-3.234')).toBe(false);
      expect(isPositiveInteger(-1234)).toBe(false);
      expect(isPositiveInteger(-1234.234)).toBe(false);
      expect(isPositiveInteger(Number.MIN_VALUE)).toBe(false);
      expect(isPositiveInteger(Infinity)).toBe(false);
    });
  });

  describe('isFloat()', () => {
    it('', () => {
      expect(isFloat(1234)).toBe(true);
      expect(isFloat(1234.234)).toBe(true);
      expect(isFloat(-1234)).toBe(true);
      expect(isFloat(-1234.234)).toBe(true);
      expect(isFloat('3')).toBe(true);
      expect(isFloat('+a#!@#3')).toBe(false);
      expect(isFloat(Number.MIN_VALUE)).toBe(true);
      expect(isFloat(Infinity)).toBe(true);
    });
  });

  describe('isPositiveFloat()', () => {
    it('', () => {
      expect(isPositiveFloat(1234)).toBe(true);
      expect(isPositiveFloat(1234.234)).toBe(true);
      expect(isPositiveFloat('+a#!@#3')).toBe(false);
      expect(isPositiveFloat(-1234)).toBe(false);
      expect(isPositiveFloat(-1234.234)).toBe(false);
      expect(isPositiveFloat('3')).toBe(true);
    });
  });

  describe('integerFilter()', () => {

    it('normal', () => {
      expect(integerFilter(1234.34)).toBe('1234');
      expect(integerFilter(-1234.34)).toBe('-1234');
      expect(integerFilter('1234.34')).toBe('1234');
      expect(integerFilter('-1234.34')).toBe('-1234');
      expect(integerFilter('-1234.34.34')).toBe('-1234');
      expect(integerFilter('abc')).toBe('');
      expect(integerFilter(true)).toBe('');
      expect(integerFilter(0)).toBe('0');
      expect(integerFilter('0')).toBe('0');
    });

    it('isPositive', () => {
      expect(integerFilter(1234.34, true)).toBe('1234');
      expect(integerFilter(-1234.34, true)).toBe('1234');
      expect(integerFilter('-1234.34', true)).toBe('1234');
      expect(integerFilter('-1234.34.34', true)).toBe('1234');
      expect(integerFilter('abc', true)).toBe('');
      expect(integerFilter(true, true)).toBe('');
    });
  });

  describe('floatFilter()', () => {

    it('normal', () => {
      expect(floatFilter(1234.34)).toBe('1234.34');
      expect(floatFilter(-1234.34)).toBe('-1234.34');
      expect(floatFilter('1234.')).toBe('1234.');
      expect(floatFilter('1234..')).toBe('1234.');
      expect(floatFilter('1234.34')).toBe('1234.34');
      expect(floatFilter('-1234.34')).toBe('-1234.34');
      expect(floatFilter('-1234.34.34')).toBe('-1234.34');
      expect(floatFilter('abc')).toBe('');
      expect(floatFilter(true)).toBe('');
      expect(integerFilter(0)).toBe('0');
      expect(integerFilter('0')).toBe('0');
    });

    it('isPositive', () => {
      expect(floatFilter(1234.34, true)).toBe('1234.34');
      expect(floatFilter(-1234.34, true)).toBe('1234.34');
      expect(floatFilter('-1234.34', true)).toBe('1234.34');
      expect(floatFilter('-1234.34.34', true)).toBe('1234.34');
      expect(floatFilter('abc', true)).toBe('');
      expect(floatFilter(true, true)).toBe('');
    });
  });

});
