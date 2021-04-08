/* eslint-disable no-console */
require('dotenv').config();
const path = require('path');
const express = require('express');
const passport = require('passport');
const CLIENT_PATH = path.resolve(__dirname, '../client/dist');
const app = express();
require('./passport-setup');
app.use(passport.initialize());
app.use(passport.session());
//app.use(express.json());   //<===we'll need something like this eventually, when we start handling http requests
app.use(express.static(CLIENT_PATH));
const PORT = 8080;

// Auth Routes

//this doesn't work. We may need ejs
app.get('/success', (req, res) => {
  res.render(`${CLIENT_PATH}/index`);
});

app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/success');
  }
);

app.listen(PORT, (() => {
  console.log(`Server listening at http://127.0.0.1:${PORT}`); //might want to alter this for deployment
}));
