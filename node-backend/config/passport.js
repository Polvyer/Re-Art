const passport = require('passport');
const bcrypt = require('bcryptjs');

// Strategies
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;

// Models
const User = require('../models/user');
const Portfolio = require('../models/portfolio');
const Image = require('../models/image');

// Authenticate user
passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username }, (err, user) => {
        if (err) { return done(err); }
        if (!user) {
          // Username does not exist
          return done(null, false, { message: 'Username does not exist' });
        }
        // Compare hashed passwords
        bcrypt.compare(password, user.password, (err, res) => { // res => true or false
          if (err) { return done(err); }
          if (res) {
            // Passwords match (user => _id, username, password, email)
            return done(null, user, { message: 'Logged in successfully' });
          } else {
            // Passwords do not match
            return done(null, false, { message: 'Incorrect password' });
          }
        });
      });
  })
);

// Extract token from cookie
const cookieExtractor = function(req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['token'];
  }
  return token;
}

// Verify user
passport.use(
  new JWTStrategy({
    jwtFromRequest: cookieExtractor,
    secretOrKey: process.env.JWT_SECRET
  }, function(jwtPayload, done) {
    // Find the user in db
    return Portfolio.findById(jwtPayload.id)
            .populate('owner', 'username')
            .populate('avatar')
            .exec((err, portfolio) => {
              if (err) {
                return done(err);
              }
              if (!portfolio) {
                return done(null, false, { message: 'Incorrect username' });
              }
              return done(null, portfolio, { message: 'Authorized successfully' });
            });
  })
);