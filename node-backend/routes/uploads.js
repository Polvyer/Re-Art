const express = require('express');
const router = express.Router();

// Require controller module
const upload_controller = require('../controllers/uploadController');

/// UPLOAD ROUTES ///

// POST request for creating Upload
router.post('/', upload_controller.image_create);

// GET request for one Upload
router.get('/:imageid', upload_controller.image_detail);

module.exports = router;