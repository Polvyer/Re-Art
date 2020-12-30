const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: { type: String, required: true, minlength: 6, maxlength: 30 },
    password: { type: String, required: true, minlength: 8, maxlength: 128 }
  }
);

// Export model
module.exports = mongoose.model('User', UserSchema);