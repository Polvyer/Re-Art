const jwt = require('jsonwebtoken');

require('dotenv').config();

const verifyToken = async (req, res, next) => {

  // Check the user's cookies for a cookie named token
  const token = req.cookies.token || '';

  try {
    if (!token) {
      // User's session expired
      return res.status(401).json(['You need to login.']);
    }

    // Verify the token
    const token_payload = await jwt.verify(token, process.env.JWT_SECRET);

    if (!token_payload) {
      return res.status(401).json(['Token invalid.']);
    }

    // Token payload only stores portfolio id (this is determined in generateToken.js)
    req.portfolio = { "_id": token_payload.id };

    // Go to the next middleware
    next();
  } catch (err) {
    return next(err);
  }
};

module.exports = verifyToken;