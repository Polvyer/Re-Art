const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const compression = require('compression');

const CLIENT_BUILD_PATH = path.join(__dirname, "../react-frontend/build");

require('dotenv').config();

require('./config/passport');

const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
const sessionRouter = require('./routes/session');

const app = express();

// Set up mongoose connection
const mongoDB = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mpgou.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(logger('dev'));
app.use(compression()); // Compress all routes

// Static files
app.use(express.static(CLIENT_BUILD_PATH));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors(
  {
    origin: [
      `${process.env.FRONT_URL}`,
      'http://localhost:3000',
      'https://mypage.com',
    ],
    credentials: true // Enable HTTP cookies over CORS
  }
));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/users', usersRouter);
app.use('/api/posts', postsRouter);
app.use('/api/session', sessionRouter);

// Serve React client (handles any requests that don't match the ones above)
app.get("/*", function(req, res) {
  res.sendFile(path.join(CLIENT_BUILD_PATH, "index.html"));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  if (err.name === 'CastError') {
    return res.status(400).json(['Malformatted id']);
  } else if (err.name === 'ValidationError') {
    return res.status(400).json([err.message]);
  }

  // Error for any other situation that hasn't been predicted
  return res.status(err.status || 500).json(['Oops! Something went wrong, please try again.']);
});

module.exports = app;
