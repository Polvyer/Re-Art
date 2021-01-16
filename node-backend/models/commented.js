const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentedSchema = new Schema(
  {
    postid: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
    portfolioid: { type: Schema.Types.ObjectId, ref: 'Portfolio', required: true },
    commentid: { type: Schema.Types.ObjectId, ref: 'Comments', required: true },
    status: { type: String, enum: ['like', 'dislike'], required: true }
  }
);

// Export model
module.exports = mongoose.model('Commented', CommentedSchema);