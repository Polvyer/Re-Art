const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ImageSchema = new Schema(
  {
    name: { type: String, default: 'None', required: true },
    data: { type: String, required: true }
  }
);

// Export model
module.exports = mongoose.model('Image', ImageSchema);