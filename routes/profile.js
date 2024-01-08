'use strict';

const { Router } = require('express');
const router = Router();
const Profile = require('../models/profile');

const profiles = [
  {
    "id": 1,
    "name": "A Martinez",
    "description": "Adolph Larrue Martinez III.",
    "mbti": "ISFJ",
    "enneagram": "9w3",
    "variant": "sp/so",
    "tritype": 725,
    "socionics": "SEE",
    "sloan": "RCOEN",
    "psyche": "FEVL",
    "image": "https://soulverse.boo.world/images/1.png",
  }
];

/** Create profile */
router.post('/', async (req, res, next) => {
  try {
    const { id, name } = req.body;

    // Check if the id is already in use
    const existingProfileWithId = await Profile.findOne({ id });
    if (existingProfileWithId) {
      return res.status(400).json({ error: 'Profile with this ID already exists' });
    }

    // Check if the name is already in use
    const existingProfileWithName = await Profile.findOne({ name });
    if (existingProfileWithName) {
      return res.status(400).json({ error: 'Profile with this Name already exists' });
    }

    // If both checks pass, create the new profile
    const newProfile = await Profile.create(req.body);
    res.status(201).json(newProfile);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

/** Read profile */
router.get('/:id', async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ id: req.params.id });
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.render('profile_template', {
      profile,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;