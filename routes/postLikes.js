/* eslint-disable prettier/prettier */
const express = require('express');

const router = express.Router();
const postLikesController = require('../controllers/postLikes.controller');

/**
 * @path /postLikes
 */

router.post('/addLike', postLikesController.addLike);
router.delete('/deleteLike/:idpost&:idUser', postLikesController.Unlike);

router.post('/getLikesPerPost', postLikesController.getLikesByPost);
router.post('/isButtonLikeChecked', postLikesController.isLikeButtonChecked);
router.get('/getNotifications', postLikesController.getNotifications);
router.put('/updateNotifisCheckedState', postLikesController.updateNotifState);
router.post('/getLikessByPost', postLikesController.getLikessByPost);

module.exports = router;
