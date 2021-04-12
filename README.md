# BackpackApp

Backpack is a simple roadtrip app meant for use in the continental US.

It is designed to aid users in getting inspiration for routes, obtaining
safety and social information about a place before you visit, as well
as planning out where you might stay along the way.  

It is designed using React Google Maps, found here:

https://www.npmjs.com/package/react-google-maps

# To start this app:

Run the following commands:

npm install
npm run dev
node server/dbseed
npm start


And then follow the provided link to your browser of choice. 

# API KEYS:

Change .env.example to .env. 
.env is already git ignored.
This file will store your API keys.
You can find API keys at the following links:

ORS_KEY:
https://openrouteservice.org/dev/#/signup

civics_key:
https://developers.google.com/civic-information

rapidApiKey:
https://rapidapi.com/kerloom/api/safe-travel-covid-index

walkScoreKey:
https://rapidapi.com/theapiguy/api/walk-score

PLACES_API_KEY:
https://developers.google.com/maps/documentation/places/web-service/overview

Note:
The map will render with a "Developer Purposes Only" watermark until a Google api key is provided on line 197 in App.jsx.
You can get the key here:
https://developers.google.com/maps/documentation/javascript/get-api-key
We recommend leaving the watermark on during development, and hard coding the api key during deployment.
Making sure that the api key is restricted to your IP.

# OpenRouteService API

Used to plot out a route between two points

/directions endpoint to plot the fastest way from one set of coordinates to the other

/geocode/search endpoint to convert a string for a placename into trackable coordinates

# Authentication && features

Authentication is done through google OAuth. Once a user is logged in they can add a place to 
stay along their roadtrip, represented on the map as a couch icon. This couch includes a name,
email address and phone number. Only the user will be able to see what they post, for now. 

A friends feature is in the works. This would include the ability to add friends, share 
couches and share your favorite travel spots. 


# Tech-Stack
//just gonna put in everything i can think of.

React
React Google Maps
Express
Mongodb
aws -ec2
axios


Google Civics Api
Google OAuth
Rapid API


Node.js
Nodemon
Styled Components
