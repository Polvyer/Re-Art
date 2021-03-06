const mongoose = require('mongoose');
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    title: { type: String, required: true, minlength: 1, maxlength: 50 },
    summary: { type: String, required: true, minlength: 1, maxlength: 1000 },
    art_type: { type: String, required: true, enum: ['Drawing', 'Photography', 'Painting', 'Inking'], default: 'Drawing' },
    hashtags: { type: String, required: true, minlength: 1, maxlength: 100 },
    private: { type: Boolean, default: false, required: true },
    date_posted: { type: Date, default: Date.now, required: true },
    poster: { type: Schema.Types.ObjectId, ref: 'Portfolio', required: true },
    image: { type: Schema.Types.ObjectId, ref: 'Image', required: true },
    numberOfComments: { type: Number, required: true, default: 0 }
  }
);

PostSchema
.virtual('date_posted_formatted')
.get(function () {
  return DateTime.fromJSDate(this.date_posted).toLocaleString(DateTime.DATE_MED);
});

// Export model
module.exports = mongoose.model('Post', PostSchema);