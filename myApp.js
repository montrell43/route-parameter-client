require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');

// Root-level logger middleware FIRST
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

// Root route for "/"
app.get('/', (req, res) => {
  res.send('Welcome to the Express app!');
});

// Echo route
app.get('/:word/echo', (req, res) => {
  const word = req.params.word;
  res.json({ echo: word });
});

// /json route with optional uppercase
app.get('/json', (req, res) => {
  const message = process.env.MESSAGE_STYLE === 'uppercase'
    ? 'HELLO JSON'
    : 'Hello json';
  res.json({ message });
});

// /now route with middleware chaining
app.get('/now', (req, res, next) => {
  req.time = new Date().toString();
  next();
}, (req, res) => {
  res.json({ time: req.time });
});

module.exports = app;
