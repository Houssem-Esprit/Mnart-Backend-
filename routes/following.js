/* eslint-disable prettier/prettier */
const express = require('express');
const followingController = require('../controllers/following.controller');

const router = express.Router();

/**
 * @path /followings
 */

router.post('/deleteFollowing', followingController.deleteFollowing);

module.exports = router;
