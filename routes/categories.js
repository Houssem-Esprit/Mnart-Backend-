const express = require('express');

const router = express.Router();
const multer = require('multer');
const path = require('path');
const categoryController = require('../controllers/category.controller');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images/categories');
  },
  filename: (req, file, cb) => {
    const newCatFile = new Date().getTime().toString() + path.extname(file.originalname);
    cb(null, newCatFile);
  },
});

const upload = multer({ storage });

/**
 * @path /categories
 */

router.route('/').post(upload.single('categoryImg'), categoryController.create).get(categoryController.getCategories);

module.exports = router;
