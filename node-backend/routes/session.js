const express = require('express');
const router = express.Router();

// Require controller module
const session_controller = require('../controllers/sessionController');

/// SESSION ROUTES ///

// POST login request
router.post('/', session_controller.session_login);

// DELETE logout request
router.delete('/', session_controller.session_logout);

module.exports = router;