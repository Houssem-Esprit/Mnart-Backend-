/* eslint-disable prettier/prettier */
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const db = require('./models/user.model');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
const postLikesRouter = require('./routes/postLikes');
const categoriesRouter = require('./routes/categories');
const commentsRouter = require('./routes/comments');
const subcommentsRouter = require('./routes/subComments');
const followRequestRouter = require('./routes/follow_requests');
const followingRouter = require('./routes/following');

const coursRouter = require('./routes/cours');
const { verifyToken } = require('./utils/jwt_utils');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(helmet());
// app.use(verifyToken);

app.use(
  '/public/images/categories/',
  express.static('public/images/categories/'),
);
app.use('/public/images/posts/', express.static('public/images/posts/'));
app.use('/public/images/users/', express.static('public/images/users/'));
app.use('/public/videos/cours/', express.static('public/videos/cours/'));

app.use('/', indexRouter);
app.use('/users', usersRouter); /**  This o  ne */
app.use('/categories', categoriesRouter);
app.use('/posts', postsRouter);
app.use('/cours', coursRouter);
app.use('/postLikes', postLikesRouter);
app.use('/comments', commentsRouter);
app.use('/subcomments', subcommentsRouter);
app.use('/followrequests', followRequestRouter);
app.use('/followings', followingRouter);

console.log('timestamp:', new Date().getTime().toString());
require('./models/connection');

/* seq.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
 });    */

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

console.log('timestamp', new Date().getTime().toString());
module.exports = app;
