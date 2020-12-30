const express = require('express');
const router = express.Router();

// Require controller module
const user_controller = require('../controllers/userController');

/// USER ROUTES ///

// POST register request
router.post('/', user_controller.user_register);

// GET request for one User
router.get('/:userid', user_controller.user_detail);

// PUT request to update User
router.put('/:userid', user_controller.user_update);

module.exports = router;
