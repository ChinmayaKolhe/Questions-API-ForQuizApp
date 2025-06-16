const express = require('express');
const router = express.Router();
const PuzzleQuestion = require('../models/PuzzleQuestion');

// Get all puzzle questions
router.get('/', async (req, res) => {
  try {
    const questions = await PuzzleQuestion.find().limit(80);
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get random puzzle questions
router.get('/random', async (req, res) => {
  try {
    // First check how many documents exist
    const count = await PuzzleQuestion.countDocuments();
    const size = Math.min(30, count); // Don't request more than available
    
    if (count === 0) {
      return res.status(404).json({ message: 'No questions found' });
    }

    const questions = await PuzzleQuestion.aggregate([
      { $sample: { size } }
    ]);
    
    res.json({
      count: questions.length,
      questions
    });
  } catch (err) {
    console.error('Error getting random questions:', err);
    res.status(500).json({ 
      error: 'Failed to get random questions',
      details: err.message
    });
  }
});

// Add a puzzle question
router.post('/', async (req, res) => {
  try {
    const { question, options, answer, image_url } = req.body;
    const newQuestion = new PuzzleQuestion({ question, options, answer, image_url });
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Bulk insert puzzle questions
router.post('/bulk', async (req, res) => {
  try {
    const questions = req.body;
    const inserted = await PuzzleQuestion.insertMany(questions);
    res.status(201).json(inserted);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;