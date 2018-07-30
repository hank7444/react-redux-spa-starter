import isSafeInteger from 'lodash/isSafeInteger';
import isNumber from 'lodash/isNumber';
import isNaN from 'lodash/isNaN';

const integerMatchRegex = /[-]?\d*/;
const positiveIntegerMatchRegex = /\d+/;
const floatMatchRegex = /^[-]?(?:(?:0|[1-9][0-9]*)(?:\.[0-9]*)?|\.[0-9]+)/;
const positiveFloatMatchRegex = /(?:(?:0|[1-9][0-9]*)(?:\.[0-9]*)?|\.[0-9]+)/;

export function isInteger(value) {
  const _value = +value;

  return isSafeInteger(_value) && !isNaN(_value);
}

export function isPositiveInteger(value) {
  const _value = +value;

  return isSafeInteger(_value) && _value >= 0;
}

export function isFloat(value) {
  const _value = +value;

  return isNumber(_value) && !isNaN(_value);
}

export function isPositiveFloat(value) {
  const _value = +value;

  return isNumber(_value) && _value >= 0;
}

export function integerFilter(value, isPositive) { // 這邊設為(value = ''),不會擋掉null的狀態, 導致value.replace不存在
  const _regex = isPositive ? positiveIntegerMatchRegex : integerMatchRegex;
  const _value = value || value === 0 ? value.toString() : '';
  const result = _value.match(_regex);

  return result ? result[0] : '';
}

export function floatFilter(value, isPositive) {
  const _regex = isPositive ? positiveFloatMatchRegex : floatMatchRegex;
  const _value = value || value === 0 ? value.toString() : '';
  const result = _value.match(_regex);

  return result ? result[0] : '';
}
