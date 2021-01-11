const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ImageSchema = new Schema(
  {
    key: { type: String, required: true },
    location: { type: String, required: true },
    mimetype: { type: String, required: true },
    size: { type: Number, required: true },
    type: { type: String, required: true, enum: ['Post', 'Avatar', 'Comment'] },
  }
);

// Export model
module.exports = mongoose.model('Image', ImageSchema);