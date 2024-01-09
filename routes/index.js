const express = require('express');
const profileRoute = require('./profile');
const commentRoute = require('./comment');

const router = express.Router()

router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error'
  });
});

router.use(express.json());

router.use('/profile', profileRoute);
router.use('/comment', commentRoute);

module.exports = router;