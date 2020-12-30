

// Send list of all Posts
exports.post_list = function(req, res, next) {
  res.send('TODO: Post list');
};

// Handle Post create
exports.post_create = function(req, res, next) {
  res.send('TODO: Post create');
};

// Send details for a specific Post
exports.post_detail = function(req, res, next) {
  res.send('TODO: Post detail: ' + req.params.postid);
};

// Handle Post update
exports.post_update = function(req, res, next) {
  res.send('TODO: Post update: ' + req.params.postid);
};

// Hande Post delete
exports.post_delete = function(req, res, next) {
  res.send('TODO: Post delete: ' + req.params.postid);
};

// Send list of all Comments
exports.comment_list = function(req, res, next) {
  res.send('TODO: Comment list');
};

// Handle Comment create
exports.comment_create = function(req, res, next) {
  res.send('TODO: Comment create');
};

// Handle Comment delete
exports.comment_delete = function(req, res, next) {
  res.send('TODO: Comment delete: ' + req.params.commentid + req.params.postid);
};

// Handle Comment update
exports.comment_update = function(req, res, next) {
  res.send('TODO: Comment update: ' + req.params.commentid + req.params.postid);
};