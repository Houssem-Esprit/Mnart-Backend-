/* eslint-disable prettier/prettier */
const express = require('express');
const followRequestController = require('../controllers/follow_request.controller');

const router = express.Router();

/**
 * @path /followrequests
 */

router.post('/followRequest', followRequestController.followRequest);
router.post('/cancelfollowRequest', followRequestController.cancelfollowRequest);
router.post('/acceptfollowRequest', followRequestController.acceptfollowRequest, followRequestController.cancelfollowRequest);
router.post('/getAllmyFollowingRequestIgot', followRequestController.getAllmyFollowingRequestIgot);
router.post('/getAllmyFollowingRequestIsent', followRequestController.getAllmyFollowingRequestIsent);
router.post('/userToUserFollowingState', followRequestController.userToUserFollowingState);

module.exports = router;
