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
        <div className="Safety"> Tight Walkability Data! </div>
        <div>Walk Score: {this.state.walkScore}</div>
        <div>Walk Description: {this.state.walkDescription}</div>
        <div>Transit Score: {this.state.transitScore}</div>
        <div>Transit Description: {this.state.transitDescription}</div>
        <div>Bike Score: {this.state.bikeScore}</div>
        <div>Bike Description: {this.state.bikeDescription}</div>

        <button onClick={() => this.getWalkScore()}>Get Walk Score</button>
      </div>
    );
  }
}

export default WalkScore;



