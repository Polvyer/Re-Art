

// Handle Register request
exports.user_register = function(req, res, next) {
  res.send('TODO: Register request');
};

// Send details for a specific User
exports.user_detail = function(req, res, next) {
  res.send('TODO: User detail: ' + req.params.userid);
};

// Handle User update
exports.user_update = function(req, res, next) {
  res.send('TODO: User update: ' + req.params.userid);
};