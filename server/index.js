/* eslint-disable no-console */
const parks = require('./assets/data/nationalparksdata.json')
const axios = require('axios');
require('dotenv').config();
console.log(process.env.GOOGLE_CLIENT_ID);
const ORS_KEY = process.env.ORS_KEY;
const path = require('path');
const express = require('express');
const passport = require('passport');
const cookieSession = require('cookie-session');
const CLIENT_PATH = path.resolve(__dirname, '../client/dist');
const ASSETS_PATH = path.resolve(__dirname, 'assets');
const app = express();
require('./passport-setup');

// configure this with an expiration time, better keys, proxy and secure
app.use(cookieSession({
  name: 'tuto-session',
  keys: ['key1', 'key2']
}));

app.use(passport.initialize());

app.use(passport.session());
app.use(express.json());
app.use(express.static(CLIENT_PATH));
app.use('/assets', express.static(ASSETS_PATH));
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
// Logout route
app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

//check to see if user is logged in
app.get('/testing', (req, res)=>{
  if (req.user) {
    res.send(req.user);
  } else {
    res.send('not logged in');
  }
});

//login failed
app.get('/failed', (req, res) => {
  req.logout();
  res.redirect('/');
});

/*************************
 ******* API STUFF *******
 *************************/

//convert latitude, longitude coordinates into city, state string
app.put('/coordstring', (req, res) => {
  axios.get(`https://api.openrouteservice.org/geocode/reverse?api_key=${ORS_KEY}&point.lon=${req.body.lng}&point.lat=${req.body.lat}`)
    .then(data => {
      const city = data.data.features[0].properties.locality;
      const state = data.data.features[0].properties.region;
      let place;
      if (city) {
        place = JSON.stringify(city + ', ' + state);
      } else {
        place = JSON.stringify(state);
      }
      //this.setState({searchInput: city + ', ' + state});
      res.status(200).send(place);
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

//Get longitude, latitude coordinates from name of city
//WARNING: API is dumb, puts longitude first
app.put('/getcoord', (req, res) => {
  //console.log(JSON.stringify(req.body.str));
  //res.send(JSON.stringify(req.body.str));
  axios.get(`https://api.openrouteservice.org/geocode/search?api_key=${ORS_KEY}&text=${req.body.str}`)
    .then(result => {
      //console.log('this should be an array', res.data.features[0].geometry.coordinates);
      res.status(200).send(result.data.features[0].geometry.coordinates);
    })
    .catch(err => res.status(500).send(err));
});

//Get a maximum of 25 stopping points along a given route
app.put('/route', (req, res) => {
  const { startLocation, endLocation } = req.body;
  let startCoordinates, endCoordinates;
  //res.send(JSON.stringify(startLocation + ' ==> ' + endLocation));
  axios.get(`https://api.openrouteservice.org/geocode/search?api_key=${ORS_KEY}&text=${startLocation}`)
    .then(start => {
      //console.log('this should be an array', res.data.features[0].geometry.coordinates);
      startCoordinates = start.data.features[0].geometry.coordinates;
      //res.send(startCoordinates);
    }).then(()=> {
      axios.get(`https://api.openrouteservice.org/geocode/search?api_key=${ORS_KEY}&text=${endLocation}`)
        .then(end => {
          endCoordinates = end.data.features[0].geometry.coordinates;
          //res.send(endCoordinates);
        })
        .then(() => {
          //res.send(endCoordinates);
          axios.get(`https://api.openrouteservice.org/v2/directions/driving-car?api_key=${ORS_KEY}&start=${startCoordinates}&end=${endCoordinates}`)
            .then(response => {
              //console.log(response.data);
              //console.log(JSON.stringify(response.data.features[0].geometry.coordinates));
              let coorArray = response.data.features[0].geometry.coordinates;
              let placeHolder = [];
              while (coorArray.length > 25) {
                //console.log(`array length = ${coorArray.length}`);
                for (let i = 0; i < coorArray.length; i += 2) {
                  placeHolder.push(coorArray[i]);
                }
                coorArray = placeHolder;
                placeHolder = [];
              }
              //console.log(coorArray);
              //this.setState({ routeArray: coorArray });
              res.send(coorArray);
            })
            .catch(function (error) {
              res.send(error);
            });
        });
    });
});

app.get('/parks', (req, res) => {
  //res.send('parks');
  res.send(parks);
});

app.listen(PORT, (() => {
  console.log(`Server listening at http://127.0.0.1:${PORT}`); //might want to alter this for deployment
}));
