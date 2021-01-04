const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const Portfolio = require('../models/portfolio');
const User = require('../models/user');
const Image = require('../models/image');
const generateToken = require('../config/generateToken')

// Check if user is logged in
exports.session_check = function(req, res, next) {
  console.log(req.user);
};

// Handle Login request
exports.session_login = function(req, res, next) {
  passport.authenticate('local', { session: false }, function(err, user, { message }) {
    if (err || !user) {
      return res.status(400).json({
        message: 'Something is not right',
        user // user === false
      });
    }

    req.login(user, { session: false }, function(err) {
      if (err) { res.send(err); }
    });

    // Generate a signed json web token with the portfolio _id
    // and return it in the response
    Portfolio.findOne({ owner: user._id }) // Manully populates a property
      .populate('owner', 'username') // Only return the username
      .populate('avatar')
      .exec(async (err, portfolio) => {
        if (err) { res.send(err); }
        try {
          await generateToken(res, portfolio._id);
          return res.status(200).json(portfolio);
        } catch(err) {
          return res.status(500).json(err.toString());
        }
      });
  })(req, res, next);
};

// Handle Logout request
exports.session_logout = function(req, res, next) {
  res.send('TODO: Logout request');
};