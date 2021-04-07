/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable no-console */
/* eslint-disable react/destructuring-assignment */
//simple comment
import React from 'react';
import axios from 'axios';
const { ORS_KEY } = require('../../../server/config.js');
// import PropTypes from 'prop-types';
// import ReactDOM from 'react-dom';
import Information from './Information.jsx';
import Map from './Map.jsx';
const { mapKey } = require('../../../server/config');
class App extends React.Component {
  constructor(props) {
    super(props);
    /**
     * defaultZoom={4}
     * defaultCenter={{ lat: 37.0902, lng: -95.7129 }}
     */
    this.state = {
      startLocation: '',
      endLocation: '',
      searchInput: '',
      zoom: 4,
      center: { lat: 37.0902, lng: -95.7129 }
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
        //console.log('this should be the starting locations coordinates \n', arr);
        startCoordinates = arr;
        console.log('these are the starting coordinates', startCoordinates);
      })
      .then(() => {
        this.getCoordinates(endLocation)
          .then(arr => {
            //console.log('this should be the end location coordinates \n', arr);
            endCoordinates = arr;
            console.log('these are the end coordinates', endCoordinates);
          })
          .then(() => {
            axios.get(`https://api.openrouteservice.org/v2/directions/driving-car?api_key=${ORS_KEY}&start=${startCoordinates}&end=${endCoordinates}`)
              .then(response => {
                //console.log(response.data);
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
        //console.log('this should be an array', res.data.features[0].geometry.coordinates);
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
        //console.log('this should also be an array, \n', res.data.features[0].geometry.coordinates);
        searchedCoord = res.data.features[0].geometry.coordinates;
        //console.log('please don\'t be undefined', searchedCoord);
        this.setState({ center: {lat: searchedCoord[1], lng: searchedCoord[0]}, zoom: 10 });
      })
      .catch(err => console.log(err));    
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

    const { searchInput } = this.state;

    return (
      <div>
        {/* {console.log('From Route.jsx:', searchInput)} */}
        <div className="App"></div>
        <form id="searchForm">
          <input type="text" name="search" className="input" placeholder="Search a city" onChange={handleSearchChange}/>
          <button type="button" className="input" onClick={primarySearch}>Search</button>
        </form>
        <form id="form">
          <input type="text" name="start" className="input" placeholder="Choose Starting Point" onChange={handleStartChange}/>
          <input type="text" name="end" className="input" placeholder="Choose Destination" onChange={handleEndChange}/>
          <button type="button" className="input" onClick={getRoute}>Get Route</button>
        </form>
        <div style={{width: '50vw', height: '80vh'}}>
          <Map
            className="map"
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${mapKey}`}
            loadingElement={<div style={{ height: '80%'}} />}
            containerElement={<div style={{ height: '80%'}} />}
            mapElement={<div style={{ height: '80%'}} />}
            test={'Hi, Im a Map Test'}
            zoom={this.state.zoom}
            center={this.state.center}
          />
        </div>
        <Information
          className="information-class"
          test={'Hi, Im an Information Test'}
          searchInput={searchInput}
        />
      </div>
    );
  }
}

export default App;
