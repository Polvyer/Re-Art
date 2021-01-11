const { body, validationResult } = require('express-validator');
const multer = require('multer');
const verifyToken = require('../config/verifyToken');
var AWS = require('aws-sdk');

require('dotenv').config();

// Models
const User = require('../models/user');
const Post = require('../models/post');
const Portfolio = require('../models/portfolio');
const Comment = require('../models/comment');
const Image = require('../models/image');

// Multer ships with storage engines DiskStorage and MemoryStorage
// And Multer adds a body object and a file or files object to the request object.
// The body object contains the values of the text fields of the form,
// the file or files object contains the files uploaded via the form.
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    // rejects storing a file
    cb(null, false);
  }
};

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
          image: post.image.location, // Image URL
          poster: poster, // _id (portfolio id), icon, owner (username)
          private: post.private,
          summary: post.summary,
          title: post.title,
          numberOfComments: (post.numberOfComments || 0),
          _id: post._id
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
  // In upload.single("file") - the name inside the single-quote is the name of the field that is going to be uploaded.
  upload.single('file'),
  
  function(req, res, next) {
    const file = req.file;
    const s3FileUrl = process.env.AWS_UPLOADED_FILE_URL_LINK;

    // AWS credentials
    let s3bucket = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION
    });

    // Where you want to store your file
    var params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: Date.now() + file.originalname,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: "public-read"
    };

    // Upload to S3 bucket
    s3bucket.upload(params, function(err, data) {
      if (err) { return next(err); }

      // Create a new image object
      const newImage = new Image({
        key: data.Key,
        location: data.Location,
        mimetype: file.mimetype,
        size: file.size,
        type: 'Post',
      });

      // Save new image
      newImage.save(function(err) {
        if (err) { return next(err); }

        // Create a new post object
        const newPost = new Post({
          title: req.body.title,
          summary: req.body.summary,
          art_type: req.body.art_type,
          hashtags: req.body.hashtags,
          private: req.body.private,
          poster: req.portfolio, // From verifyToken middleware
          image: newImage._id, // id gets stored after save
        });

        // Save new post
        newPost.save(function(err) {
          if (err) { return next(err); }

          // Return new post information
          return res.status(200).json(newPost);
        });
      });
    });

    /*
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
    */
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