const uuIdMatchRegex = /\w{8}(-\w{4}){3}-\w{12}?/;

export function isUUID(value) {
  const _value = value || '';

  return uuIdMatchRegex.test(_value);
}

