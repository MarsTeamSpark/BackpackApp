/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React from 'react';
// import PropTypes from 'prop-types';
// import ReactDOM from 'react-dom';
import axios from 'axios';
//const { rapidApiKey, walkScoreKey } = require('../../../server/config.js');

class WalkScore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      walkScore: null,
      walkDescription: '',
      transitScore: null,
      transitDescription: '',
      bikeScore: null,
      bikeDescription: ''
    };

  }

  getWalkScore() {
    console.log('hello from walkscore');
    console.log(this.props.center);
    axios.put('/walk', this.props.center).then((response) => {
      //console.log(response.data);
      this.setState({
        walkScore: response.data.walkscore,
        walkDescription: response.data.description,
        transitScore: response.data.transit.score,
        transitDescription: response.data.transit.description,
        bikeScore: response.data.bike.score,
        bikeDescription: response.data.bike.description
      });
    })
      .catch((error) => {
        console.error(error);
      });
  }

  // componentDidMount() {
  //   this.getSafetyData();
  // }

  render() {
    return (
      <div >
        <div className="Safety"> <h2>Walkability:</h2> </div>
        <div><h3>Walk Score:</h3> {this.state.walkScore}</div>
        <div><h3>Walk Description:</h3> {this.state.walkDescription}</div>
        <div><h3>Transit Score:</h3> {this.state.transitScore}</div>
        <div><h3>Transit Description:</h3> {this.state.transitDescription}</div>
        <div><h3>Bike Score:</h3> {this.state.bikeScore}</div>
        <div><h3>Bike Description:</h3> {this.state.bikeDescription}</div>
        <br></br>
        <button onClick={() => this.getWalkScore()}>Get Walk Score</button>
      </div>
    );
  }
}

export default WalkScore;



