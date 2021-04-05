/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable no-console */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import axios from 'axios';
<<<<<<< HEAD
const ORS_KEY = require('../../../server/config.js');
=======
const { ORS_KEY } = require('../../../server/config.js');
>>>>>>> f8cbfa6da8ca73b09c5fee628a6f7486e852c88d
// import PropTypes from 'prop-types';
// import ReactDOM from 'react-dom';

class Route extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startLocation: '',
      endLocation: '',
      searchInput: ''
    };
    // BIND YOUR METHODS
    this.getRoute = this.getRoute.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);
    this.handleStartChange = this.handleStartChange.bind(this);
    this.getCoordinates = this.getCoordinates.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.primarySearch = this.primarySearch.bind(this);
  }

  getRoute () {
    const { startLocation, endLocation } = this.state;
    let startCoordinates;
    let endCoordinates;
    this.getCoordinates(startLocation)
      .then(arr => {
        console.log('this should be the starting locations coordinates \n', arr);
        startCoordinates = arr;
        console.log('these are the starting coordinates', startCoordinates);
      })
      .then(() => {
        this.getCoordinates(endLocation)
          .then(arr => {
            console.log('this should be the end location coordinates \n', arr);
            endCoordinates = arr;
            console.log('these are the end coordinates', endCoordinates);
          })
          .then(() => {
            axios.get(`https://api.openrouteservice.org/v2/directions/driving-car?api_key=${ORS_KEY}&start=${startCoordinates}&end=${endCoordinates}`)
              .then(response => {
                console.log(JSON.stringify(response.data));
              })
              .catch(function (error) {
                console.log(error);
              });
          })
          .catch(err => {
            console.log(err);
          });
      });
  }

  getCoordinates (str) {
    return axios.get(`https://api.openrouteservice.org/geocode/search?api_key=${ORS_KEY}&text=${str}`)
      .then(res => {
        console.log('this should be an array', res.data.features[0].geometry.coordinates);
        return res.data.features[0].geometry.coordinates;
      })
      .catch(err => {
        console.log(err);
      });
  }

  primarySearch () {
    const { searchInput } = this.state;
    let searchedCoord;

    axios.get(`https://api.openrouteservice.org/geocode/search?api_key=${ORS_KEY}&text=${searchInput}`)
      .then(res => {
        console.log('this should also be an array, \n', res.data.features[0].geometry.coordinates);
        searchedCoord = res.data.features[0].geometry.coordinates;
      })
      .catch(err => console.log(err));

    console.log('this should be the same as the previous array: \n', searchedCoord);
  }


  handleStartChange (e) {
    this.setState({startLocation: e.target.value});
  }
  
  handleEndChange (e) {
    this.setState({endLocation: e.target.value});
  }
  
  handleSearchChange (e) {
    this.setState({searchInput: e.target.value});
  }

  render() {
    const getRoute = this.getRoute;
    const handleEndChange = this.handleEndChange;
    const handleStartChange = this.handleStartChange;
    const handleSearchChange = this.handleSearchChange;
    const primarySearch = this.primarySearch;

    return (
      <div>
        <div className="Routes"></div>
        <form id="searchForm">
          <input type="text" name="search" className="input" placeholder="Search a city" onChange={handleSearchChange}/>
          <button type="button" onClick={primarySearch}>Search</button>
        </form>
        <form id="form">
          <input type="text" name="start" className="input" placeholder="Choose Starting Point" onChange={handleStartChange}/>
          <input type="text" name="end" className="input" placeholder="Choose Destination" onChange={handleEndChange}/>
          <button type="button" onClick={getRoute}>Get Route</button>
        </form>

      </div>
    );
  }
}

export default Route;
