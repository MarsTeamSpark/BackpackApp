/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable no-console */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import Ors from 'openrouteservice-js';
import axios from 'axios';
import ORS_KEY from '../../../server/config.js';
// import PropTypes from 'prop-types';
// import ReactDOM from 'react-dom';

class Route extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startLocation: '',
      endLocation: '',
      startCoord: [],
      endCoord: []
    };
    // BIND YOUR METHODS
    this.getRoute = this.getRoute.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);
    this.handleStartChange = this.handleStartChange.bind(this);
    this.getStartCoordinates = this.getStartCoordinates.bind(this);
    this.getEndCoordinates = this.getEndCoordinates.bind(this);
  }

  getRoute () {
    //console.log(ORS_KEY);
    const { startCoord, endCoord } = this.state;
    const startCoordinates = startCoord;
    const endCoordinates = endCoord;
    // [89.234234, 40.08082]
    // '89.233333, 40.20934'
    console.log('these are the starting coordinates', startCoordinates);
    console.log('these are the end coordinates', endCoordinates);

    axios.get(`https://api.openrouteservice.org/v2/directions/driving-car?api_key=${ORS_KEY}&start=${startCoordinates}&end=${endCoordinates}`)
      .then(response => {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getStartCoordinates () {
    const { startLocation } = this.state;
    let newCoordinates;

    axios.get(`https://api.openrouteservice.org/geocode/search?api_key=${ORS_KEY}&text=${startLocation}`)
      .then(function (response) {
        console.log('this should be an array', response.data.features[0].geometry.coordinates);
        newCoordinates = response.data.features[0].geometry.coordinates;
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => {
        console.log('Done!');
      });
    console.log('new starting coordinates', newCoordinates);
    this.setState({startCoord: newCoordinates});
  }

  getEndCoordinates () {
    const { endLocation } = this.state;
    let newCoordinates;

    axios.get(`https://api.openrouteservice.org/geocode/search?api_key=${ORS_KEY}&text=${endLocation}`)
      .then(function (response) {
        console.log('this should be an array', response.data.features[0].geometry.coordinates);
        newCoordinates = response.data.features[0].geometry.coordinates;
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => {
        console.log('Done!');
      });
    console.log('new end coordinates', newCoordinates);

    this.setState({endCoord: newCoordinates});
  }

  handleStartChange (e) {
    this.setState({startLocation: e.target.value});
  }
  
  handleEndChange (e) {
    this.setState({endLocation: e.target.value});
  }

  render() {
    const getRoute = this.getRoute;
    const handleEndChange = this.handleEndChange;
    const handleStartChange = this.handleStartChange;
    const getStartCoordinates = this.getStartCoordinates;
    const getEndCoordinates = this.getEndCoordinates;

    return (
      <div>
        <div className="Routes"> This is where route functionality will come in </div>
        <form id="form">
          <input type="text" name="start" className="input" placeholder="Choose Starting Point" onChange={handleStartChange}/>
          <input type="text" name="end" className="input" placeholder="Choose Destination" onChange={handleEndChange}/>
          <button type="button" onClick={() => {
            getStartCoordinates();
            getEndCoordinates();
            getRoute();
            // .then(() => {
            //   getEndCoordinates();
            // })
            // .then(() => {
            //   getRoute();
            // })
            // .catch(err => console.log(err));
          }}>Get Route</button>
        </form>
      </div>
    );
  }
}

export default Route;
