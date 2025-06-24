const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const puzzleRoutes = require('./routes/puzzleRoutes');
const musicRoutes = require('./routes/musicRoutes');
const languageRoutes = require('./routes/languageRoutes');
const pictureRoutes = require('./routes/pictureRoutes');

dotenv.config();
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/puzzles', puzzleRoutes);
app.use('/api/music', musicRoutes);
app.use('/api/language', languageRoutes);
app.use('/api/pictures', pictureRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(3000, () => console.log('Server started on port 3000')))
  .catch(err => console.error(err));