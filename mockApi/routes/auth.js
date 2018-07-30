import express from 'express';
import sha1 from 'sha1';

import { DEFAULT_ERR_MSG_HASH } from 'src/shared/request/ApiErrorCode';

const router = express.Router();
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiQ1VTVE9NRVIiLCJleHRyYSI6eyJjX2lkIjowLCJtX2lkIjo1MDV9LCJleHAiOjE0ODM3NTkwMTEsImlhdCI6MTQ4MTE2NzAxMSwiZW1haWwiOiJoYW5rNzQ0NEBnbWFpbC5jb20iLCJ1c2VybmFtZSI6Imhhbms3NDQ0QGdtYWlsLmNvbSJ9.or2eThLF9JCDYmmf9ry0zBYsCQui-NbNUvc9PEIVsUw';

/*
  myapi/auth
*/

router.post('/', (req, res) => {

  const {
    INVALID_ACCOUNT,
    INVALID_PASSWORD,
    ACCOUNT_NOT_ACTIVED,
  } = DEFAULT_ERR_MSG_HASH;
  const account = req.body.account;
  const password = req.body.password;

  setTimeout(() => {

    if (account === 'test@email.com' && password === sha1('test')) {
      return res.status(200).end(token);
    }

    if (account === 'noactivated@email.com') {
      return res.status(ACCOUNT_NOT_ACTIVED.status).json(ACCOUNT_NOT_ACTIVED);
    }

    if (account !== 'test@email.com') {
      return res.status(INVALID_ACCOUNT.status).json(INVALID_ACCOUNT).end();
    }

    if (password !== sha1('test')) {
      return res.status(INVALID_PASSWORD.status).json(INVALID_PASSWORD).end();
    }

  }, 500);
});

export default router;
