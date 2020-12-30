const express = require('express');
const router = express.Router();

// Require controller module
const post_controller = require('../controllers/postController');

/// POST ROUTES ///

// GET request for list of all Post items
router.get('/', post_controller.post_list);

// POST request for creating Post
router.post('/', post_controller.post_create);

// GET request for one Post
router.get('/:postid', post_controller.post_detail);

// PUT request to update Post
router.put('/:postid', post_controller.post_update);

// DELETE request to delete Post
router.delete('/:postid', post_controller.post_delete);

/// COMMENT ROUTES ///

// GET request for list of all Comment items
router.get('/:postid/comments', post_controller.comment_list);

// POST request for creating Comment
router.post('/:postid/comments', post_controller.comment_create);

// DELETE request to delete Comment
router.delete('/:postid/comments/:commentid', post_controller.comment_delete);

// PUT request to update Comment
router.put('/:postid/comments/:commentid', post_controller.comment_update);

module.exports = router;