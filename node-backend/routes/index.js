var express = require('express');
var router = express.Router();
var verifyToken = require('../config/verifyToken');

/* GET home page. */
router.get('/', verifyToken, function(req, res, next) {
  res.status(200).json('Testing');
});

module.exports = router;
