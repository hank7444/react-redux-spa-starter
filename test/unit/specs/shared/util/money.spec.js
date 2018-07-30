import 'intl/locale-data/jsonp/en-US.js';
import {
  formatMoney,
} from 'src/shared/util/money';

describe('utils/money', () => {
  it('USD', () => {
    expect(formatMoney(null)).toBe(null);
    expect(formatMoney(undefined)).toBe(null);
    expect(formatMoney(2500)).toBe('2,500');
    expect(formatMoney(100)).toBe('100');
    expect(formatMoney(100123)).toBe('100,123');
  });
});
