const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    description: { type: String, required: true, minlength: 1, maxlength: 300 },
    likes: { type: Number, required: true, default: 0 },
    date_posted: { type: Date, default: Date.now, required: true },
    poster: { type: Schema.Types.ObjectId, ref: 'Portfolio', required: true },
    post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
    attachment: { type: Schema.Types.ObjectId, ref: 'Image' },
  }
);

// Export model
module.exports = mongoose.model('Comment', CommentSchema);