/* eslint-disable prettier/prettier */
const express = require('express');
const commentsController = require('../controllers/comment.controller');

const router = express.Router();

/**
 * @path /comments
 */

router.post('/addComment', commentsController.addComment);
router.post('/postCommentsNbr', commentsController.countComments);
router.post('/getCommentsByPost', commentsController.getCommentsByPost);

module.exports = router;
