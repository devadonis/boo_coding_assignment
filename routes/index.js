const express = require('express');
const profileRouter = require('./profile');

const router = express.Router()

router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error'
  });
});

router.use(express.json());

router.use('/profile', profileRouter);

module.exports = router;