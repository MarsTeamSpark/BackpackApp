/* eslint-disable no-console */
require('dotenv').config();
const path = require('path');
const express = require('express');
const passport = require('passport');
const cookieSession = require('cookie-session');
const CLIENT_PATH = path.resolve(__dirname, '../client/dist');
const app = express();
require('./passport-setup');

// configure this with an expiration time, better keys, proxy and secure
app.use(cookieSession({
  name: 'tuto-session',
  keys: ['key1', 'key2']
}));

app.use(passport.initialize());

app.use(passport.session());
app.use(express.json()); //we'll need this when we start handling http requests
app.use(express.static(CLIENT_PATH));
const PORT = 8080;

// Auth Routes

app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
  function(req, res) {
    // Successful authentication, redirect home.
    console.log('hello from google callback');
    console.log(req.user.displayName);
    console.log(req.user.emails[0].value);
    //console.log(req.user.photos[0].value);
    res.redirect('/');
  }
);

app.listen(PORT, (() => {
  console.log(`Server listening at http://127.0.0.1:${PORT}`); //might want to alter this for deployment
}));
