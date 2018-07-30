import {
  cmykToRGB,
  cmykToHex,
} from 'src/shared/util/color';

describe('shared/util/color', () => {
  it('"cmykToRGB" transforms color code CMYK to color code RGB and returns an array', () => {
    let result = cmykToRGB(0.5, 0.5, 0.5, 0.5);

    expect(result[0]).toBe(64);
    expect(result[1]).toBe(64);
    expect(result[2]).toBe(64);

    result = cmykToRGB(0.2, 0.1, 0.3, 0.4);
    expect(result[0]).toBe(122);
    expect(result[1]).toBe(138);
    expect(result[2]).toBe(107);
  });

  it('"cmykToHEX" transforms color code CMYK to color code HEX and returns an string', () => {
    let result = cmykToHex(0.5, 0.5, 0.5, 0.5);
    expect(result).toBe('#404040');

    result = cmykToHex(0.2, 0.1, 0.3, 0.4);
    expect(result.toUpperCase()).toBe('#7A8A6B');
  });
});
