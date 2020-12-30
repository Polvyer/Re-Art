const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PortfolioSchema = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    biography: { type: String, maxlength: 150 },
    icon: { type: String, required: true, enum: ['Hobbyist', 'Student', 'Professional', 'Anonymous'], default: 'Anonymous' },
    avatar: { type: Schema.Types.ObjectId, ref: 'Image' }
  }
);

// Export model
module.exports = mongoose.model('Portfolio', PortfolioSchema);