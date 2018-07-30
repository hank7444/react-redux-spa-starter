import {
  isUUID,
} from 'src/shared/util/uuid';

describe('shared/util/uuid', () => {
  it('uuid format', () => {
    expect(isUUID('apple pen')).toBe(false);
    expect(isUUID('f1031298,dcff,47a9,b77a,1d0300a859c3')).toBe(false);
    expect(isUUID('f103-dcff-47a9-b77a-1d0300a859c3')).toBe(false);
    expect(isUUID('f1031298-dc-47a9-b77a-1d0300a859c3')).toBe(false);
    expect(isUUID('f1031298-dcff-49-b77a-1d0300a859c3')).toBe(false);
    expect(isUUID('f1031298-dcff-47a9-b7-1d0300a859c3')).toBe(false);
    expect(isUUID('f1031298-dcff-47a9-b77a-1d0300a8')).toBe(false);
    expect(isUUID('1234')).toBe(false);

    expect(isUUID('f1031298-dcff-47a9-b77a-1d0300a859c3')).toBe(true);
    expect(isUUID('c0c55e98-1e7e-42c3-8aa8-5e4201e937b2')).toBe(true);
  });
});
