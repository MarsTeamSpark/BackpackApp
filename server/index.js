const path = require('path');
const express = require('express');
const CLIENT_PATH = path.resolve(__dirname, '../client/dist');
const app = express();
//app.use(express.json());   //<===we'll need something like this eventually, when we start handling http requests
app.use(express.static(CLIENT_PATH));
const PORT = 8080;

app.listen(PORT, (() => {
  console.log(`Server listening at http://127.0.0.1:${PORT}`); //might want to alter this for deployment
}));