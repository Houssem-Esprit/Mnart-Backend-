/* eslint-disable prettier/prettier */
const express = require('express');

const router = express.Router();
const userController = require('../controllers/user.controller');

/**
 * @path /users
 */

router.post('/create', userController.create);

router.post('/authenticate', userController.getUser);

/* GET users listing. */
router.get('/fetchUsers', userController.getUsers);

router.post('/getUserById', userController.getUserByID);
module.exports = router;
