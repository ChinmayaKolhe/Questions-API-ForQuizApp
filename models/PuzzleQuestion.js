const mongoose = require('mongoose');

const puzzleQuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: { type: [String], required: true },
  answer: { type: String, required: true },
  image_url: { type: String }
});

module.exports = mongoose.model('PuzzleQuestion', puzzleQuestionSchema);