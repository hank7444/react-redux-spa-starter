import { createValidator, required, email } from 'shared/validation/validation';

const validation = createValidator({
  account: [required, email],
  password: [required],
}, {
  account: {
    required: 'valid.email.required',
    email: 'valid.email.invalid',
  },
  password: {
    required: 'valid.password.required',
  },
});

export default validation;
