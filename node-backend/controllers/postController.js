const User = require('../models/user');
const Post = require('../models/post');
const Portfolio = require('../models/portfolio');
const Comment = require('../models/comment');
const Image = require('../models/image');
const { body, validationResult } = require('express-validator');

// Send list of all Posts
exports.post_list = function(req, res, next) {
  Post.find()
    .populate('poster')
    .populate('image')
    .exec(function(err, post_list) {
      if (err) { return next(err); }
      // Successful, so send
      return res.status(200).json(post_list);
    });
};

// Handle Post create
exports.post_create = function(req, res, next) {
  // Create a Post object
  const post = new Post(
    {
      title: req.body.title,
      summary: req.body.summary,
      art_type: req.body.art_type,
      hashtags: req.body.hashtags,
      private: req.body.private,
      date_posted: Date.now(),
      poster: req.user.id, // From verify token
      image: req.body.image,
    }
  );

  console.log(post)

  // Save Post
  post.save(function(err) {
    if (err) { return res.status(500).json(err.toString()); }
    // Successful
    return res.status(200).json(post);
  });
};

// Send details for a specific Post
exports.post_detail = function(req, res, next) {
  res.send('TODO: Post detail: ' + req.params.postid);
};

// Handle Post update
exports.post_update = function(req, res, next) {
  res.send('TODO: Post update: ' + req.params.postid);
};

// Hande Post delete
exports.post_delete = function(req, res, next) {
  res.send('TODO: Post delete: ' + req.params.postid);
};

// Send list of all Comments
exports.comment_list = function(req, res, next) {
  res.send('TODO: Comment list');
};

// Handle Comment create
exports.comment_create = function(req, res, next) {
  res.send('TODO: Comment create');
};

// Handle Comment delete
exports.comment_delete = function(req, res, next) {
  res.send('TODO: Comment delete: ' + req.params.commentid + req.params.postid);
};

// Handle Comment update
exports.comment_update = function(req, res, next) {
  res.send('TODO: Comment update: ' + req.params.commentid + req.params.postid);
};