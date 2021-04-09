/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable no-console */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import axios from 'axios';
//const { ORS_KEY } = require('../../../server/config.js');
import Information from './Information.jsx';
import Map from './Map.jsx';
import Navbar from './NavBar.jsx';
import Input from './Input.jsx';
const { mapKey } = require('../../../server/config');
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startLocation: '',
      endLocation: '',
      searchInput: '',
      zoom: 4,
      center: { lat: 37.0902, lng: -95.7129 },
      routeArray: [],
      parks: []
    };
    // BIND YOUR METHODS
    this.getRoute = this.getRoute.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);
    this.handleStartChange = this.handleStartChange.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.primarySearch = this.primarySearch.bind(this);
    this.reCenter = this.reCenter.bind(this);
    this.coordinateToString = this.coordinateToString.bind(this);
    this.getNationalParks = this.getNationalParks.bind(this);
  }
  componentDidMount() {
    this.getNationalParks();
  }

  getNationalParks() {
    axios.get('/parks')
      .then((res) => {
        this.setState({parks: res.data});
      })
      .catch (err => {
        console.log(err);
      });
  }

  reCenter (latitude, longitude, zm) {
    this.setState({center: { lat: latitude, lng: longitude}, zoom: zm});
    this.coordinateToString(latitude, longitude);
  }
  // sets searchInput in to city name from coordinates
  coordinateToString(latitude, longitude) {
    axios.put('/coordstring', {lat: latitude, lng: longitude})
      .then(result => {
        this.setState({searchInput: result.data});
      })
      .catch(err => {
        console.log(err);
      });
  }
  //displays at most 25 points between two locations
  getRoute () {
    const { startLocation, endLocation } = this.state;
    axios.put('/route', {startLocation: startLocation, endLocation: endLocation})
      .then(result => {
        console.log(result.data);
        this.setState({ routeArray: result.data });
      })
      .catch( err => {
        console.log(err);
      });
  }
  //get coordinates from city name, zoom in on coordinates
  primarySearch () {
    const { searchInput } = this.state;
    let searchedCoord;
    axios.put('/getcoord', {str: searchInput})
      .then(res => {
        this.setState({ center: {lat: res.data[1], lng: res.data[0]}, zoom: 10 });
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
        <Navbar/>
        <br></br>
        <Input
          handleSearchChange={this.handleSearchChange}
          primarySearch={this.primarySearch}
          handleStartChange = {this.handleStartChange}
          handleEndChange = {this.handleEndChange}
          getRoute = {this.getRoute}
        />
        <Information
          className="information-class"
          searchInput={searchInput}
          center={this.state.center}
        />
        <div style={{width: '90vw', height: '80vh'}}>
          <Map
            className="map"
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${mapKey}`}
            loadingElement={<div style={{ height: '80%'}} />}
            containerElement={<div style={{ height: '80%'}} />}
            mapElement={<div style={{ height: '80%'}} />}
            zoom={this.state.zoom}
            center={this.state.center}
            route={this.state.routeArray}
            reCenter={this.reCenter}
            parks={this.state.parks}
          />
        </div>
      </div>
    );
  }
}

export default App;
