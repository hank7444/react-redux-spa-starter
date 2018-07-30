export function cmykToRGB(c, m, y, k) {
    var R = Math.round(255 * (1 - c) * (1 - k)),
        G = Math.round(255 * (1 - m) * (1 - k)),
        B = Math.round(255 * (1 - y) * (1 - k));

    R = R < 0 ? 0 : R;
    G = G < 0 ? 0 : G;
    B = B < 0 ? 0 : B;

    return [R, G, B];
};

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

export function cmykToHex(c, m, y, k) {
    const RGB = cmykToRGB(c, m, y, k);

    return "#" + componentToHex(RGB[0]) + componentToHex(RGB[1]) + componentToHex(RGB[2]);
};
