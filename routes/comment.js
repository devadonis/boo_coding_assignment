'use strict';

const { Router } = require('express');
const mongoose = require('mongoose');
const router = Router();
const Profile = require('../models/profile');
const Comment = require('../models/comment');

/** Create comment for the profile */
router.post('/:profile_id', async (req, res, next) => {
  try {
    const { profile_id } = req.params;
    const { description, mbti, enneagram, zodiac } = req.body;

    // Check if the profile exists
    const profile = await Profile.findOne({ id: profile_id });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    // Create a new comment
    const newComment = new Comment({
      profile: profile._id,
      description,
      mbti,
      enneagram,
      zodiac
    });

    const savedComment = await newComment.save();

    // Update the profile's comments array with the new comment's ID
    profile.comments.unshift(savedComment._id);
    await profile.save();

    res.status(201).json(savedComment);
  } catch (error) {
    console.error(error.message);
    next(error)
  }
});

router.put('/like/:comment_id', async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.comment_id);

    // Check if the comment has already been liked.
    // In real project, the fanId should replace to the req.user.id
    if (comment.likes.some(like => like.toString() === req.body.fanId)) {
      return res.status(400).json({ message: 'Comment already liked' });
    }

    const fanId = new mongoose.Types.ObjectId(req.body.fanId);
    comment.likes.unshift(fanId);
    await comment.save();

    return res.status(201).json(comment.likes);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});

router.put('/unlike/:comment_id', async (req, res, next) => {
  try {
    const { fanId } = req.body;
    const comment = await Comment.findById(req.params.comment_id);

    // Check if the comment has not yet been liked
    // In real project, the fanId should replace to the req.user.id
    if (!comment.likes.some(like => like.toString() === fanId)) {
      return res.status(400).json({ message: 'Comment has not yet been liked' });
    }

    comment.likes = comment.likes.filter(like => like.toString() !== fanId);
    await comment.save();

    return res.status(201).json(comment.likes);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
})

module.exports = router;