const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: { type: String, required: true, minlength: 6, maxlength: 16 },
    email: { type: String, required: true },
    password: { type: String, required: true },
  }
);

UserSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject._id = returnedObject._id.toString()
    delete returnedObject.__v
  }
});

// Export model
module.exports = mongoose.model('User', UserSchema);