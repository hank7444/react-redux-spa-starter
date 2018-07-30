import express from 'express';
import sha1 from 'sha1';

import random from 'mockApi/utils/random';
import {
  DEFAULT_ERR_MSG_HASH
} from 'src/shared/request/ApiErrorCode';

const router = express.Router();

const data = {
  mid: 1234,
  name: '',
  age: 20,
  gender: 'male',
};


/*
  myapi/me
*/

router.route('/')
  .get((req, res) => {
    setTimeout(() => {

      data.name = `myname ${random.int(1, 20)}`;
      return res.status(200).json(data);
    }, 500);
  })
  .put((req, res) => {

    const {
      userName
    } = req.body;

    setTimeout(() => {

      if (userName === 'fail') {
        return res.status(500).end();
      }
      return res.status(200).end();
    }, 500);
  });



export default router;
