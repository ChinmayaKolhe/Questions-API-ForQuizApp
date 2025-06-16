const mongoose = require('mongoose');

const languageQuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: { type: [String], required: true },
  answer: { type: String, required: true },
  image_url: { type: String },
  language: { type: String, enum: ['English', 'Marathi', 'Hindi', 'Sanskrit'] }
});

module.exports = mongoose.model('LanguageQuestion', languageQuestionSchema);