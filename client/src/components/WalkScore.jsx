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
        <div><h3>Walk Score:</h3> <h5>{this.state.walkScore}</h5></div>
        <div><h3>Walk Description:</h3> <h5>{this.state.walkDescription}</h5></div>
        <div><h3>Bike Score:</h3> <h5>{this.state.bikeScore}</h5></div>
        <div><h3>Bike Description:</h3> <h5>{this.state.bikeDescription}</h5></div>
        <br></br>
        <button onClick={() => this.getWalkScore()}>Get Walk Score</button>
      </div>
    );
  }
}

export default WalkScore;



