const { body, validationResult } = require('express-validator');
const multer = require('multer');
const verifyToken = require('../config/verifyToken');

// Models
const User = require('../models/user');
const Post = require('../models/post');
const Portfolio = require('../models/portfolio');
const Comment = require('../models/comment');
const Image = require('../models/image');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    console.log('All Good')
    cb(null, true);
  } else {
    console.log('Reject');
    // rejects storing a file
    cb(null, false);
  }
}

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

// Send list of all Posts
exports.post_list = function(req, res, next) {

  // Get all posts from database
  Post.find()
    .populate('image')
    .populate({
      path: 'poster',
      model: 'Portfolio',
      populate: {
        path: 'owner',
        model: 'User',
      }
    })
    .exec(function(err, post_list) {
      if (err) { return next(err); }

      // Modify post list to liking
      const posts = post_list.map(post => {
        const poster = {
          _id: post.poster._id,
          icon: post.poster.icon,
          owner: post.poster.owner.username,
        };
        return {
          art_type: post.art_type,
          date_posted: post.date_posted,
          hashtags: post.hashtags,
          image: post.image,
          poster: poster,
          private: post.private,
          summary: post.summary,
          title: post.title,
        };
      });

      // Successful, so send
      return res.status(200).json(posts);
    });
};

// Handle Post create
exports.post_create = [

  verifyToken,

  // Stores image in uploads folder using
  // multer and creates a reference to the file
  upload.single('imageData'),
  
  function(req, res, next) {
    return res.status(200).json('Upload successful');
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
  }
]

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