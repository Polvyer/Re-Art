const express = require('express');
const router = express.Router();
const verifyToken = require('../config/verifyToken');

// Require controller module
const session_controller = require('../controllers/sessionController');

/// SESSION ROUTES ///

// GET check request
router.get('/', verifyToken, session_controller.session_check);

// POST login request
router.post('/', session_controller.session_login);

// DELETE logout request
router.delete('/', verifyToken, session_controller.session_logout);

module.exports = router;