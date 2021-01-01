const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const User = require('../models/user');
const Portfolio = require('../models/portfolio');
const Image = require('../models/image');

const cookieExtractor = function(req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['token'];
  }
  return token;
}

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: 'Incorrect username' });
        }
        if (user.password !== password) {
          return done(null, false, { message: 'Incorrect password' });
        }
        return done(null, user, { message: 'Logged in successfully' });
      });
  })
);

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