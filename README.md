# BackpackApp
A travel app that aids with safety considerations

# To start this app:

npm install
npm run dev
npm start
Click the link

# API KEYS:

Change config.example.js to config.js. Config.js is already git ignored.
This file will store your API keys.
You can find API keys at the following links:

ORS_KEY:
https://openrouteservice.org/dev/#/signup

civics_key:
https://developers.google.com/civic-information

rapidApiKey:
https://rapidapi.com/kerloom/api/safe-travel-covid-index

REACT_APP_GOOGLE_KEY:
https://developers.google.com/maps/documentation/javascript/get-api-key
# OpenRouteService API
Used to plot out a route between two points

/directions endpoint to plot the fastest way from one set of coordinates to the other

/geocode/search endpoint to convert a string for a placename into trackable coordinates