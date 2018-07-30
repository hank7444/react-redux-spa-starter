const common = {
  'common.snackbar.loading': 'Loading Data...',
  'common.snackbar.loaderr': 'Failed to load data, please try again later',
  'common.snackbar.senderr': 'Failed to send data, please try again later',
  'common.snackbar.err': 'Network is unable to connect. <br>Please try again later.',
  'common.snackbar.err.disconnected': 'There is no internet connection. <br>Please try agiain later.',
  'common.snackbar.err.timeout': 'Well, that\'s didn\'t go as planned <br/>Please try reloading again later.',

  'common.btn.yes': 'YES',
  'common.btn.no': 'NO',
  'common.btn.ok': 'OK',

  'common.btn.login': 'Log In',
  'common.btn.logining': 'Logging In...',
  'common.label.account': 'Email',
  'common.label.pwd': 'Password',

  'common.popup.invalid.title': 'Invalid',
  'common.popup.oops.title': 'Oops!',
  'common.popup.error.title': 'Server Error',
  'common.popup.error.desc': 'Please try again later.',
};

const valid = {
  'valid.common.maxLength': 'Please enter no more than {max} characters.',

  'valid.email.required': 'Please fill in your email.',
  'valid.email.invalid': 'Please enter a valid email.',
  'valid.name.required': 'Please fill in your name.',
  'valid.password.required': 'Please fill in your password.',
  'valid.password.passwordLength': 'Be between 8 - 16 characters',
  'valid.password.passwordOneUppercaseLetter': 'Include an uppercase letter',
  'valid.password.passwordOneLowercaseLetter': 'Include an lowercase letter',
  'valid.password.passwordOneNumber': 'Include a number',
  'valid.password.passwordNoSpace': 'Should not contain any spaces',

  'valid.password.match': 'Please confirm your password.',
  'valid.birthday.required': 'Please fill in your birthday.',
  'valid.birthday.invalid': 'Please enter a valid birthday.',
};

// Login, Register
const pageAuth = {
  'auth.popup.invalid.desc': 'Invalid Email or Password',
  'auth.popup.exist.title': 'Email In Use',
  'auth.popup.exist.desc': 'This email has already signed up with us.',
  'auth.alert.invalidAccountOrPassword': 'Email or password is invalid.',
};

export default Object.assign(
  {},
  common,
  valid,
  pageAuth,
);
