/* eslint-disable prettier/prettier */
const express = require('express');
const subcommentsController = require('../controllers/subComment.controller');

const router = express.Router();

/**
 * @path /subcomments
 */

router.post('/addSubComment', subcommentsController.addSubComment);
router.post('/postsubCommentsNbr', subcommentsController.countsubComments);
router.post('/getsubCommentsPerUser', subcommentsController.getsubCommentsPerUser);
router.get('/gettest', subcommentsController.getalltest);

module.exports = router;
