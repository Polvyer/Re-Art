const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const generateToken = require('../config/generateToken');

// Models
const Portfolio = require('../models/portfolio');
const User = require('../models/user');
const Image = require('../models/image');

// Check if user is logged in / has a valid token
exports.session_check = function(req, res, next) {
  Portfolio.findById(req.portfolio._id)
    .populate('owner', 'username') // Only returns the username
    .populate('avatar')
    .exec((err, portfolio) => {
      if (err) { return next(err); }

      // Construct user
      const user = {
        "_id": portfolio._id,
        "owner": portfolio.owner.username,
        "icon": portfolio.icon,
      };

      // Add biography if it exists
      if (portfolio.biography) { 
        user.biography = portfolio.biography; 
      }

      // Add avatar if it exists
      if (portfolio.avatar) {
        user.avatar = portfolio.avatar;
      }

      return res.status(200).json(user);
    });
};

// Handle Login request
exports.session_login = function(req, res, next) {
  passport.authenticate('local', { session: false }, function(err, user, { message }) {
    if (err) { return next(err); }
    if (!user) {
      // Username does not exist OR incorrect password
      return res.status(400).json([message]);
    }

    // Typically establishes a login session
    // BUT in this case it assigns user => req.user
    req.login(user, { session: false }, function(err) {
      if (err) { return next(err); }
    });

    // Get user's info
    Portfolio.findOne({ owner: user._id })
      .populate('owner', 'username') // Only returns the username
      .populate('avatar')
      .exec(async (err, portfolio) => {
        if (err) { return next(err); }

        try {
          // Generate a new JWT token
          await generateToken(res, portfolio._id);

          // Construct user
          const user = {
            "_id": portfolio._id,
            "owner": portfolio.owner.username,
            "icon": portfolio.icon,
          };

          // Add biography if it exists
          if (portfolio.biography) { 
            user.biography = portfolio.biography; 
          }

          // Add avatar if it exists
          if (portfolio.avatar) {
            user.avatar = portfolio.avatar;
          }

          return res.status(200).json(user);
        } catch(err) {
          return next(err);
        }
      });
  })(req, res, next); // This gives the custom callback access to the req and res objects through closure
};

// Handle Logout request
exports.session_logout = function(req, res, next) {
  res.send('TODO: Logout request');
};