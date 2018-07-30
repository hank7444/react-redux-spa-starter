export function capitalize(pstr = '') {
  const str = pstr.toString();

  return str.split(' ').map((word) => {
    const firstChar = word.substring(0, 1).toUpperCase();
    return firstChar + word.slice(1).toLowerCase();
  }).join(' ');
}

export function shorten(pstr = '', maxLength = 20) {
  const str = pstr.toString();
  return str.length > maxLength ? `${str.substring(0, maxLength)}...` : str;
}
