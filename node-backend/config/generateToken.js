const jwt = require('jsonwebtoken'); 

const generateToken = (res, id) => {

  // Set cookie expiration
  const expiration = process.env.NODE_ENV === 'development' ? 3600000 : 604800000; // in ms (1 hour === 3600000 ms)

  // Sign token with portfolio id (for minimum payload)
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    // Set token expiration
    expiresIn: process.env.NODE_ENV === 'development' ? '1d' : '7d',
  });

  return res.cookie('token', token, {
    expires: new Date(Date.now() + expiration), // Cookies that are used for sensitive information (such as indicating authentication) should have a short lifetime
    secure: false, // Sent to the server only with an encrypted request over the HTTPS protocol, never with unsecured HTTP (except on localhost)
    httpOnly: true, // Inaccessible to the JavaScript Document.cookie API; it is sent only to the server
  });
}

module.exports = generateToken