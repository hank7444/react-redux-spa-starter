import express from 'express';

const router = express.Router();

/*
  myapi/countries
*/
router.get('/', (req, res) => {
  setTimeout(() => {
    return res.status(200).send('XX');
  }, 500);
});

export default router;
