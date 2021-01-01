const jwt = require('jsonwebtoken');

require('dotenv').config();

const verifyToken = async (req, res, next) => {
  const token = req.cookies.token || '';

  console.log("Cookies: ", req.cookies);

  try {
    if (!token) {
      return res.status(401).json('You need to Login')
    }
    const decrypt = await jwt.verify(token, process.env.JWT_SECRET);

    console.log("Decrypt: ", decrypt); // id will be accessible through here

    req.user = {
      id: decrypt.id
    };
    next();
  } catch (err) {
    return res.status(500).json(err.toString());
  }
};

module.exports = verifyToken;