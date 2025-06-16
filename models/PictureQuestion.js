const mongoose = require('mongoose');

const pictureQuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: { type: [String], required: true },
  answer: { type: String, required: true },
  image_url: { type: String, required: true }
});

module.exports = mongoose.model('PictureQuestion', pictureQuestionSchema);