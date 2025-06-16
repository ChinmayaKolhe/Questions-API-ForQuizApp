const express = require('express');
const router = express.Router();
const PictureQuestion = require('../models/PictureQuestion');

// Get all picture questions
router.get('/', async (req, res) => {
  try {
    const questions = await PictureQuestion.find().limit(80);
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get 30 random picture questions
router.get('/random', async (req, res) => {
  try {
    const questions = await PictureQuestion.aggregate([{ $sample: { size: 30 } }]);
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a single picture question
router.post('/', async (req, res) => {
  try {
    const { question, options, answer, image_url } = req.body;
    if (!image_url) {
      return res.status(400).json({ error: 'image_url is required for picture questions' });
    }
    const newQuestion = new PictureQuestion({
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

// Bulk insert picture questions
router.post('/bulk', async (req, res) => {
  try {
    if (!Array.isArray(req.body)) {
      return res.status(400).json({ error: 'Request body must be an array of questions' });
    }
    // Validate all questions have image_url
    if (req.body.some(q => !q.image_url)) {
      return res.status(400).json({ error: 'All picture questions must have image_url' });
    }
    const inserted = await PictureQuestion.insertMany(req.body);
    res.status(201).json(inserted);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a picture question by ID
router.delete('/:id', async (req, res) => {
  try {
    await PictureQuestion.findByIdAndDelete(req.params.id);
    res.json({ message: 'Picture question deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;