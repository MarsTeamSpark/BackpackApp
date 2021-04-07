/* eslint-disable no-console */
const passport = require('passport');
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL} = require ('./config.js');

const GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.use( new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: GOOGLE_CALLBACK_URL,
  passReqToCallback: true
}, function(request, accessToken, refreshToken, profile, done) {
  console.log(profile);
  return done(null, profile);
}
));
