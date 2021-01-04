const { body } = require('express-validator');
const async = require('async');
const bcrypt = require('bcryptjs');
const generateToken = require('../config/generateToken');

// Models
const User = require('../models/user');
const Portfolio = require('../models/portfolio');

// Handle Register request
exports.user_register = [

  // Store req.body data in res.locals.body for later comparison
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

          // Create a portfolio object
          const newPortfolio = new Portfolio({
            "owner": newUser._id,
          });

          // Save new portfolio
          newPortfolio.save(async function(err) {
            if (err) { return next(err); }

            // Generate a new JWT token
            await generateToken(res, newPortfolio._id);

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
  res.send('TODO: User detail: ' + req.params.userid);
};

// Handle User update
exports.user_update = function(req, res, next) {
  res.send('TODO: User update: ' + req.params.userid);
};