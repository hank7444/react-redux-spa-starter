import {
  birthday,
  password,
  passwordLength,
  passwordOneUppercaseLetter,
  passwordOneLowercaseLetter,
  passwordOneNumber,
  passwordNoSpace,
} from 'src/shared/validation/validation';

describe('shared/util/validation/validation', () => {
  it('tests if date format is yyyy/mm/dd', () => {
    const returnIfError = 'birthday';

    expect(birthday(null)).toBe('');
    expect(birthday('asdfasdf')).toBe(returnIfError);
    expect(birthday('0000/01/01')).toBe(returnIfError);
    expect(birthday('1000/00/01')).toBe(returnIfError);
    expect(birthday('1000/13/01')).toBe(returnIfError);
    expect(birthday('1000/01/00')).toBe(returnIfError);
    expect(birthday('1000/01/32')).toBe(returnIfError);
    expect(birthday('116-01-12')).toBe(returnIfError);
    expect(birthday('10000/01/00')).toBe(returnIfError);
    expect(birthday('1000/001/10')).toBe(returnIfError);
    expect(birthday('1000/01/010')).toBe(returnIfError);
    expect(birthday('1116/4/32')).toBe(returnIfError);
    expect(birthday('1116/6/32')).toBe(returnIfError);
    expect(birthday('1116/9/32')).toBe(returnIfError);
    expect(birthday('1116/11/32')).toBe(returnIfError);
    expect(birthday('1116/02/30')).toBe(returnIfError);
    expect(birthday('2015/02/29')).toBe(returnIfError);

    expect(birthday('1987-07-32')).toBe(returnIfError);
    expect(birthday('1116-02-1')).toBe(returnIfError);
    expect(birthday('1116-02-30')).toBe(returnIfError);
    expect(birthday('1988-02-01')).toBe(returnIfError);
    expect(birthday('2015-02-29')).toBe(returnIfError);

    expect(birthday('2016/02/29')).toBeUndefined();

    const futureDate = new Date();
    futureDate.setTime(futureDate.getTime() + 8640000);
    expect(birthday(`${futureDate.getYear()}/${futureDate.getMonth() + 1}/${futureDate.getDate()}`)).toBe(returnIfError);
  });

  it ('test password', () => {
    const returnIfError = 'password';

    expect(password(' asdfasdf')).toBe(returnIfError); // 不可有空白
    expect(password('asdfasdf ')).toBe(returnIfError); // 不可有空白
    expect(password('asdf asdf ')).toBe(returnIfError); // 不可有空白
    expect(password('asdfasd')).toBe(returnIfError); // 密碼須為 8 ~ 16 字元
    expect(password('123451234512345sA')).toBe(returnIfError); // 密碼須為 8 ~ 16 字元
    expect(password('12345ABCDEF')).toBe(returnIfError); // 必須至少有一個小寫字元
    expect(password('1234asdfasdf')).toBe(returnIfError); // 必須至少有一個大寫字元
    expect(password('testtest')).toBe(returnIfError); // 必須有數字

    expect(password('2abasdkL')).toBeUndefined();
  });

  it('test passwordLength 8 ~ 16個字元', () => {
    const returnIfError = 'passwordLength';

    expect(passwordLength('1234567')).toBe(returnIfError);
    expect(passwordLength('12345123451234512345')).toBe(returnIfError);

    expect(passwordLength('12345678')).toBeUndefined();
    expect(passwordLength('1234567812345678')).toBeUndefined();
  });

  it('test passwordOneUppercaseLetter, 至少有個大寫字母', () => {
    const returnIfError = 'passwordOneUppercaseLetter';

    expect(passwordOneUppercaseLetter('1234567')).toBe(returnIfError);
    expect(passwordOneUppercaseLetter('1234aaa')).toBe(returnIfError);

    expect(passwordOneUppercaseLetter('1234A1324')).toBeUndefined();
  });

  it('text passwordOneLowercaseLetter, 至少有個小寫字母', () => {
    const returnIfError = 'passwordOneLowercaseLetter';

    expect(passwordOneLowercaseLetter('1234567A')).toBe(returnIfError);
    expect(passwordOneLowercaseLetter('1234AAAA')).toBe(returnIfError);

    expect(passwordOneLowercaseLetter('1234a1324')).toBeUndefined();
  });

  it('text passwordOneNumber, 至少有個數字', () => {
    const returnIfError = 'passwordOneNumber';

    expect(passwordOneNumber('aaaaaaa')).toBe(returnIfError);
    expect(passwordOneNumber('bbbb_$!@#')).toBe(returnIfError);

    expect(passwordOneNumber('aaaab1aaa')).toBeUndefined();
  });

  it('text passwordNoSpace 不可有空白', () => {
    const returnIfError = 'passwordNoSpace';

    expect(passwordNoSpace(' aaaa')).toBe(returnIfError);
    expect(passwordNoSpace('aaaa ')).toBe(returnIfError);
    expect(passwordNoSpace('aa aa')).toBe(returnIfError);

    expect(passwordNoSpace('aabbcc')).toBeUndefined();
  });

});
