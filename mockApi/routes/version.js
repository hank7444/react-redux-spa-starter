import express from 'express';

const router = express.Router();

/*
  myapi/version
*/
router.get('/', (req, res) => {
  setTimeout(() => {
    return res.status(200).json('1484101663053');
  }, 500);
});

export default router;
