const mongoose = require('mongoose');

const musicQuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: { type: [String], required: true },
  answer: { type: String, required: true },
  image_url: { type: String }
});

module.exports = mongoose.model('MusicQuestion', musicQuestionSchema);