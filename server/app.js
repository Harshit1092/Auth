const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser') 
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(express.json());

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

const dbURI = 'mongodb+srv://harshit:09200920@cluster0.1zcmrpe.mongodb.net/Auth';

mongoose.connect(dbURI)
  .then((result) => {
    console.log('connected to db');  
    app.listen(3000);
  })
  .catch((err) => console.log(err.message));

app.get('/',(req, res) => res.send('home'));
app.use(authRoutes);
app.use((req, res) => res.status(404).send('404'));