const { body } = require('express-validator');
const async = require('async');
const bcrypt = require('bcryptjs');
const verifyToken = require('../config/verifyToken');
const multer = require('multer');
var AWS = require('aws-sdk');

require('dotenv').config();

// Helper functions
const generateToken = require('../config/generateToken');

// Models
const User = require('../models/user');
const Portfolio = require('../models/portfolio');
const Post = require('../models/post');
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

// Handle Register request
exports.user_register = [

  // Store req.body data in res.locals.body for later comparison
  // (non-escaped data to escaped data)
  (req, res, next) => {
    res.locals.body = {...req.body};
    next();
  },

  // Sanitise fields
  body('username').trim().escape(),
  body('password').trim().escape(),

  // Process request after sanitization
  (req, res, next) => {

    const errors = [];

    // Validate username
    if (req.body.username !== res.locals.body.username.trim()) {
      errors.push('Username contains invalid characters');
    }

    // Validate password
    if (req.body.password !== res.locals.body.password.trim()) {
      errors.push('Password contains invalid characters');
    }

    // Check for any errors so far
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    // Search for duplicates
    async.parallel({
      username: function(callback) {
        User.findOne({ 'username': req.body.username }).exec(callback);
      },
      email: function(callback) {
        User.findOne({ 'email': req.body.email }).exec(callback);
      },
    }, function(err, results) {
      if (err) { return next(err); }

      if (results.username) {
        // Username exists
        errors.push('Username is already taken');
      }

      if (results.email) {
        // Email exists
        errors.push('Email is already taken');
      }

      // Check for any errors so far
      if (errors.length > 0) {
        return res.status(400).json(errors);
      }

      // Encrypt password
      bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
        if (err) { return next(err); }

        // Create a user object with escaped and trimmed data
        const newUser = new User({
          "username": req.body.username,
          "email": req.body.email,
          "password": hashedPassword,
        });

        // Save new user
        newUser.save(function(err) {
          if (err) { return next(err); }

          // Create a portfolio object (icon -> default 'Anonymous')
          const newPortfolio = new Portfolio({
            "owner": newUser._id,
          });

          // Save new portfolio
          newPortfolio.save(async function(err) {
            if (err) { return next(err); }

            try {
              // Generate a new JWT token
              await generateToken(res, newPortfolio._id);
            } catch(err) {
              return next(err);
            }

            // Construct user
            const user = {
              "_id": newPortfolio._id,
              "owner": newUser.username,
              "icon": newPortfolio.icon,
            };

            return res.status(200).json(user);
          });
        });
      }); 
    });
  }
];

// Send details for a specific User
exports.user_detail = function(req, res, next) {
  // req.params.userid => portfolio id (not user id)
  async.parallel({
    // Get user's info (portfolio info)
    portfolio: function(callback) {
      Portfolio.findById(req.params.userid)
      .populate('owner', 'username') // Only returns the username
      .populate('avatar')
      .exec(callback)
    },
    // Get all posts made by user
    posts: function(callback) {
      Post.find({ "poster": req.params.userid })
        .populate('image')
        .populate({
          path: 'poster',
          model: 'Portfolio',
          populate: {
            path: 'owner',
            model: 'User',
          }
        })
        .exec(callback)
    }
  }, function(err, results) {
    if (err) { return next(err); }

    // Modify post list to liking
    const posts = results.posts.map(post => {
      const poster = {
        _id: post.poster._id,
        icon: post.poster.icon,
        owner: post.poster.owner.username,
      };
      return {
        art_type: post.art_type,
        date_posted: post.date_posted,
        hashtags: post.hashtags,
        image: post.image.location,
        numberOfComments: post.numberOfComments,
        poster: poster,
        private: post.private,
        summary: post.summary,
        title: post.title,
      };
    });

    // Construct user
    const user = {
      "_id": results.portfolio._id,
      "owner": results.portfolio.owner.username,
      "icon": results.portfolio.icon,
      "posts": posts,
    };

    // Add biography if it exists
    if (results.portfolio.biography) { 
      user.biography = results.portfolio.biography; 
    }

    // Add avatar if it exists
    if (results.portfolio.avatar) {
      user.avatar = results.portfolio.avatar;
    }

    return res.status(200).json(user);
  });
};

// Handle User update
exports.user_update = [

  verifyToken,

  // Stores image in uploads folder using
  // multer and creates a reference to the file
  // In upload.single("file") - the name inside the single-quote is the name of the field that is going to be uploaded.
  upload.single('file'),

  // Sanitise fields
  body('biography').trim().escape(),

  (req, res, next) => {

    // Find portfolio of user to access owner id (since we don't have it saved on the frontend)
    Portfolio.findById(req.params.userid)
      .exec((err, portfolio) => {
        if (err) { return next(err); }

        const newPortfolio = {
          _id: portfolio._id, // This is required, or a new ID will be assigned!
          owner: portfolio.owner, // The reason we needed to query first
          icon: req.body.icon,
          biography: req.body.biography
        }

        // Check if user has an existing avatar
        if (portfolio.avatar) {
          newPortfolio.avatar = portfolio.avatar; // Store image id
        }

        // Check if user wants to update their avatar
        const file = req.file;
        if (file) { // Yes
          
          // AWS credentials
          let s3bucket = new AWS.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_REGION
          });

          // Check if user has an existing avatar
          if (portfolio.avatar) { // Yes, find image in db => delete from s3 => upload to s3 => update image db => update Portfolio

            // Find existing image
            Image.findById(newPortfolio.avatar)
              .exec((err, imageFound) => {
                if (err) { return next(err); }

                let params = {
                  Bucket: process.env.AWS_BUCKET_NAME,
                  Key: imageFound.key
                };

                // Now Delete the file from AWS-S3
                s3bucket.deleteObject(params, (err, data) => {
                  if (err) { return next(err); }

                  // Where you want to store your file
                  var newParams = {
                    Bucket: process.env.AWS_BUCKET_NAME,
                    Key: Date.now() + file.originalname,
                    Body: file.buffer,
                    ContentType: file.mimetype,
                    ACL: "public-read"
                  };

                  // Upload new image to S3
                  s3bucket.upload(newParams, function(err, newData) {
                    if (err) { return next(err); }

                    // Create a new image object
                    const newImage = new Image({
                      key: newData.Key,
                      location: newData.Location,
                      mimetype: file.mimetype,
                      size: file.size,
                      type: 'Avatar',
                      _id: newPortfolio.avatar // Necessary
                    });

                    // Update image
                    Image.findByIdAndUpdate(newPortfolio.avatar, newImage, {}, (err, theimage) => {
                      if (err) { return next(err); }

                      Portfolio.findByIdAndUpdate(req.params.userid, newPortfolio, { new: true })
                        .populate('avatar')
                        .exec((err, theportfolio) => {
                        if (err) { return next(err); }

                        // Successful - return newly-updated portfolio info
                        return res.status(200).json(theportfolio);
                      });
                    });
                  });
                });
              });
          }

          else { // No, upload to s3 => create new image => update portfolio

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
                type: 'Avatar',
              });

              // Save new image
              newImage.save(function(err) {
                if (err) { return next(err); }

                // Assign newly-uploaded avatar
                newPortfolio.avatar = newImage._id; // id gets stored after save

                Portfolio.findByIdAndUpdate(req.params.userid, newPortfolio, { new: true })
                  .populate('avatar')
                  .exec((err, theportfolio) => {
                  if (err) { return next(err); }

                  // Successful - return newly-updated portfolio info
                  return res.status(200).json(theportfolio);
                });
              });
            });
          }
        } 
        
        else { // No, just update portfolio
          Portfolio.findByIdAndUpdate(req.params.userid, newPortfolio, { new: true })
            .populate('avatar')
            .exec(async (err, theportfolio) => {
            if (err) { return next(err); }

            // Successful - return newly-updated portfolio info
            return res.status(200).json(theportfolio);
          });
        }
      });
  }
];