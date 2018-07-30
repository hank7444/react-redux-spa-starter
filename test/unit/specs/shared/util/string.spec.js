import {
  capitalize,
  shorten,
} from 'src/shared/util/string';

describe('shared/util/string', () => {
  it('capitalize a string', () => {
    expect(capitalize('apple red')).toBe('Apple Red');
    expect(capitalize('apple-red')).toBe('Apple-red');
    expect(capitalize('Apple red')).toBe('Apple Red');
    expect(capitalize('apple Red')).toBe('Apple Red');
    expect(capitalize('APplE RED')).toBe('Apple Red');
    expect(capitalize('apple red blue hotdog')).toBe('Apple Red Blue Hotdog');
    expect(capitalize('They`re my teachers')).toBe('They`re My Teachers');
    expect(capitalize()).toBe('');
    expect(capitalize(1234)).toBe('1234');
  });
});

describe('shared/util/shorten', () => {
  it('shorten a string', () => {
    expect(shorten('one two three four', 10)).toBe('one two th...');
    expect(shorten('one two three four five six seven', 20)).toBe('one two three four f...');
    expect(shorten('', 20)).toBe('');
    expect(shorten('123', 30)).toBe('123');
  });
});
