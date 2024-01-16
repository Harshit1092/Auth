const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');
const { auth } = require('./middleware/authMiddleware');
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();
app.use(cors());
dotenv.config();
app.use(express.json());
app.use(cookieParser());

const dbURI = process.env.MONGO_URL;
const port = process.env.PORT || 5000;
mongoose
  .connect(dbURI)
  .then((result) => {
    console.log('connected to db');
    app.listen(port);
  })
  .catch((err) => console.log(err.message));

  app.use('/blog',blogRoutes)
// app.get('/', (req, res) => res.send('home'));
app.use('/',authRoutes);
app.use((req, res) => res.status(404).send('404'));