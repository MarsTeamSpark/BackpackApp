/* eslint-disable no-console */
const passport = require('passport');
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL} = require ('./config.js');

const GoogleStrategy = require('passport-google-oauth2').Strategy;

//puts information into cookie
passport.serializeUser((user, done) => {
  done(null, user);
});

//decodes cookie and persists session
passport.deserializeUser((user, done) => {
  done(null, user);
});


//Strategy config
passport.use( new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: GOOGLE_CALLBACK_URL,
  passReqToCallback: true
},
(request, accessToken, refreshToken, profile, done) => {
  console.log(profile);
  done(null, profile); //passes profile data to serialize user
}
));
