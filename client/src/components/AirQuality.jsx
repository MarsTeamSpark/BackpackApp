/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React from 'react';
// import PropTypes from 'prop-types';
// import ReactDOM from 'react-dom';
import axios from 'axios';
//const { rapidApiKey, walkScoreKey } = require('../../../server/config.js');

class AirQuality extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quality: '',
      airCode: '',
      airDescription: ''
    };
    //this.getAirQuality = this.getAirQuality.bind(this);
  }

  getAirQuality() {
    console.log('hello from airQualityScore!!!');
    console.log(this.props.center);
    axios.put('/air', this.props.center).then((response) => {
      this.setState({
        quality: response.data.AirQualityIndex,
        airCode: response.data.AirQualityCode,
        airDescription: response.data.AirQuality,
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
        <div className="Safety"> <h2>Air Quality:</h2> </div>
        <div><h3>Air Quality Index:</h3> {this.state.quality}</div>
        <div><h3>Air Quality Code:</h3> {this.state.airCode}</div>
        <div><h3>Air Quality:</h3> {this.state.airDescription}</div>
        <br></br>
        <button onClick={() => this.getAirQuality()}>Get AirQuality</button>
      </div>
    );
  }
}

export default AirQuality;
