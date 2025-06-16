const express = require('express');
const router = express.Router();
const LanguageQuestion = require('../models/LanguageQuestion');

// Get all language questions (filter by language if query param provided)
router.get('/', async (req, res) => {
  try {
    const { language } = req.query;
    const query = language ? { language } : {};
    const questions = await LanguageQuestion.find(query).limit(80);
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get 30 random language questions (optionally filtered by language)
router.get('/random', async (req, res) => {
  try {
    const { language } = req.query;
    const matchStage = language ? { $match: { language } } : { $match: {} };
    const questions = await LanguageQuestion.aggregate([
      matchStage,
      { $sample: { size: 30 } }
    ]);
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a single language question
router.post('/', async (req, res) => {
  try {
    const { question, options, answer, image_url, language } = req.body;
    const newQuestion = new LanguageQuestion({
      question,
      options,
      answer,
      image_url,
      language
    });
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Bulk insert language questions
router.post('/bulk', async (req, res) => {
  try {
    if (!Array.isArray(req.body)) {
      return res.status(400).json({ error: 'Request body must be an array of questions' });
    }
    const inserted = await LanguageQuestion.insertMany(req.body);
    res.status(201).json(inserted);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a language question by ID
router.delete('/:id', async (req, res) => {
  try {
    await LanguageQuestion.findByIdAndDelete(req.params.id);
    res.json({ message: 'Language question deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;