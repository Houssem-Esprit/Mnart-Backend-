const express = require("express");

const router = express.Router();
const multer = require("multer");
const path = require("path");
const postController = require("../controllers/post.controller");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images/posts');
  },
  filename: (req, file, cb) => {
    const newCatFile =      new Date().getTime().toString() + path.extname(file.originalname);
    cb(null, newCatFile);
  },
});

const upload = multer({ storage });

/**
 * @path /posts
 */

router
  .route('/')
  .post(upload.single('image'), postController.create)
  .get(postController.get4posts);

router.post('/getPostsByCategory', postController.getpostsByCategory);

router.post('/getPostsByUserID', postController.getpostsByUserID);

router.delete('/DeletebyPostID/:idpost', postController.DeletePostByID);
router.post('/getPostByID', postController.getpostByID);

router
  .route('/UpdatePost')
  .put(upload.single('image'), postController.updatePost);

module.exports = router;
