const express = require('express');
const router = express.Router();
const MusicQuestion = require('../models/MusicQuestion');

// Get all music questions
router.get('/', async (req, res) => {
  try {
    const questions = await MusicQuestion.find().limit(80);
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get 30 random music questions
router.get('/random', async (req, res) => {
  try {
    const questions = await MusicQuestion.aggregate([{ $sample: { size: 30 } }]);
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a single music question
router.post('/', async (req, res) => {
  try {
    const { question, options, answer, image_url } = req.body;
    const newQuestion = new MusicQuestion({
      question,
      options,
      answer,
      image_url
    });
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Bulk insert music questions
router.post('/bulk', async (req, res) => {
  try {
    if (!Array.isArray(req.body)) {
      return res.status(400).json({ error: 'Request body must be an array of questions' });
    }
    const inserted = await MusicQuestion.insertMany(req.body);
    res.status(201).json(inserted);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a music question by ID
router.delete('/:id', async (req, res) => {
  try {
    await MusicQuestion.findByIdAndDelete(req.params.id);
    res.json({ message: 'Music question deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;