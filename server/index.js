/* eslint-disable no-console */
const parks = require('./assets/data/nationalparksdata.json');
const { Users, Couches } = require('./db.js');
const axios = require('axios');
require('dotenv').config();
const ORS_KEY = process.env.ORS_KEY;
const CIVICS_KEY = process.env.civics_key;
const rapidApiKey = process.env.rapidApiKey;
const walkScoreKey = process.env.WALKSCORE_KEY;
const placesApiKey = process.env.PLACES_API_KEY;
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

//convert latitude, longitude coordinates into name of city
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

//get national parks
app.get('/parks', (req, res) => {
  //res.send('parks');
  res.send(parks);
});

//get government officials for area
app.put('/civic', (req, resp) => {
  const config = {
    method: 'get',
    url: `https://www.googleapis.com/civicinfo/v2/representatives?key=${CIVICS_KEY}&address=${req.body.searchInput}`,
    headers: { }
  };

  axios.request(config)
    .then(res => {
      //console.log(res);
      const senatorObjs = [];
      for (let i = 0; i < res.data.offices.length; i++) {
        const index = res.data.offices[i];
        let phoneNum = 'Not Found';
        if (index.name === 'U.S. Senator') {
          for (let j = 0; j < index.officialIndices.length; j++) {
            if (res.data.officials[index.officialIndices[j]].phones) {
              phoneNum = res.data.officials[index.officialIndices[j]].phones[0];
            } else {
              phoneNum = 'Not Found';
            }
            senatorObjs.push({
              image: res.data.officials[index.officialIndices[j]].photoUrl,
              name: res.data.officials[index.officialIndices[j]].name,
              position: 'United States Senate',
              party: res.data.officials[index.officialIndices[j]].party,
              phone: phoneNum,
            });
          }
        } else if (index.name === 'U.S. Representative') {
          for (let h = 0; h < index.officialIndices.length; h++) {
            if (res.data.officials[index.officialIndices[h]].phones) {
              phoneNum = res.data.officials[index.officialIndices[h]].phones[0];
            } else {
              phoneNum = 'Not Found';
            }
            senatorObjs.push({
              image: res.data.officials[index.officialIndices[h]].photoUrl,
              name: res.data.officials[index.officialIndices[h]].name,
              position: 'United States House of Representatives',
              party: res.data.officials[index.officialIndices[h]].party,
              phone: phoneNum,
            });
          }
        } else if (index.name.includes('Mayor')) {
          for (let k = 0; k < index.officialIndices.length; k++) {
            if (res.data.officials[index.officialIndices[k]].phones) {
              phoneNum = res.data.officials[index.officialIndices[k]].phones[0];
            } else {
              phoneNum = 'Not Found';
            }
            senatorObjs.push({
              name: res.data.officials[index.officialIndices[k]].name,
              position: 'Office of the Mayor',
              party: res.data.officials[index.officialIndices[k]].party,
              phone: phoneNum,
            });
          }
        }
      }
      resp.send(senatorObjs);
    })
    .catch(err => {
      resp.send(err);
    });
});

//get covid related info for area
app.put('/covid', (req, res) => {
  const options = {
    method: 'GET',
    url: 'https://safe-travel-covid-index.p.rapidapi.com/safeindex',
    params: {place: `${req.body.searchInput}, USA`, lang: 'en'},
    headers: {
      'x-rapidapi-key': rapidApiKey,
      'x-rapidapi-host': 'safe-travel-covid-index.p.rapidapi.com'
    }
  };
  axios.request(options).then((response) => {
    console.log(response.data);
    res.send(response.data);
  })
    .catch(err => {
      console.log('fail');
      res.send(err);
    });
});


//get walkability, bikability stats for given coordinates
app.put('/walk', (req, res) => {
  const options = {
    method: 'GET',
    url: 'https://walk-score.p.rapidapi.com/score',
    params: {
      lon: req.body.lng,
      lat: req.body.lat,
      address: 'https://api.walkscore.com/score',
      wsapikey: walkScoreKey,
      bike: '1',
      format: 'json'
    },
    headers: {
      'x-rapidapi-key': rapidApiKey,
      'x-rapidapi-host': 'walk-score.p.rapidapi.com'
    }
  };

  axios.request(options).then((response) => {
    console.log(response);
    res.send(response.data);
  })
    .catch((error) => {
      res.send(error);
    });
});

//get air quality stats for given coordinates
app.put('/air', (req, res) => {
  const options = {
    method: 'GET',
    url: 'https://us-air-quality-by-lat-long.p.rapidapi.com/getairqualitylatlong',
    params: {
      lat: req.body.lat,
      long: req.body.lng,
    },
    headers: {
      'x-rapidapi-key': rapidApiKey,
      'x-rapidapi-host': 'us-air-quality-by-lat-long.p.rapidapi.com'
    }
  };

  axios.request(options).then((response) => {
    console.log(response.data);
    res.send(response.data);
  }).catch((error) => {
    res.send(error);
  });
});

// get hostel info from google places api
app.put('/hostel', (req, res) => {

  axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${req.body.coord}&radius=30000&type=hostel&keyword=hostel&key=${placesApiKey}`)
    .then(response => {
      console.log(response);
      res.send(response.data);
    })
    .catch(err => {
      res.send(err);
    });
});

app.put('/dispensary', (req, res) => {
  axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${req.body.coord}&radius=30000&type=dispensary&keyword=dispensary&key=${placesApiKey}`)
    .then(response => {
      console.log(response);
      res.send(response.data);
    })
    .catch(err => {
      res.send(err);
    });
});

app.put('/stateParks', (req, res) => {
  axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${req.body.coord}&radius=30000&keyword=campgrounds&key=${placesApiKey}`)
    .then(response => {
      console.log(response);
      res.send(response.data);
    })
    .catch(err => {
      res.send(err);
    });
});

/*************************
 ******* DATABASE ********
 *************************/


//probably need to delete this when we're done using it for testing
app.get('/users', (req, res) => {
  Users.find((err) => {
    if (err) {
      console.log(err);
    }
  })
    .then(data => {
      console.log('client received user list');
      res.send(data);
    })
    .catch(err => {
      console.log('client did not receive user list');
      res.send(err);
    });
});
//find couches associated with
app.get('/couches/:userid', (req, res) => {
  Couches.find({userId: req.params.userid}, (err) => {
    if (err) {
      console.log(err);
    }
  })
    .then(data => {
      console.log('client received couch list');
      res.send(data);
    })
    .catch(err => {
      console.log('client did not receive couch list');
      res.send(err);
    });
});

app.post('/adduser', (req, res) => {
  Users.find({id: req.body.id}, (err) => {
    if (err) {
      console.log(err);
    }
  })
    .then(data => {
      console.log('success');
      if (data.length) {
        res.send('user already exists');
      } else {
        Users.insertMany([{
          id: req.body.id,
          name: req.body.name,
          email: req.body.email
        }])
          .then(res.send('user added'));
      }
    })
    .catch(err => {
      console.log('fail');
      res.send(err);
    });
});

app.post('/addcouch', (req, res) => {
  axios.get(`https://api.openrouteservice.org/geocode/search?api_key=${ORS_KEY}&text=${req.body.address}`)
    .then(result => {
      //console.log('this should be an array', res.data.features[0].geometry.coordinates);
      //res.status(200).send();
      const latitude = result.data.features[0].geometry.coordinates[1];
      const longitude = result.data.features[0].geometry.coordinates[0];
      Couches.insertMany([{
        userId: req.body.userId,
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address,
        lat: latitude,
        long: longitude,
      }]);
    })
    .then(res.send('couch added'))
    .catch(res.send('couch add failed'));
});

app.listen(PORT, (() => {
  console.log(`Server listening at http://127.0.0.1:${PORT}`); //might want to alter this for deployment
}));
