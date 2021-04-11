/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React from 'react';
import axios from 'axios';
class AirQuality extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quality: null,
      airCode: null,
      airDescription: ''
    };
    this.getAirQuality = this.getAirQuality.bind(this);
  }

  getAirQuality() {
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

  render() {
    return (
      <div >
        <div className="Safety"> <h2>Air Quality:</h2> </div>
        <div><h3>Air Quality Index:</h3> <h5>{this.state.quality}</h5></div>
        <div><h3>Air Quality Code:</h3> <h5>{this.state.airCode}</h5></div>
        <div><h3>Air Quality:</h3> <h5>{this.state.airDescription}</h5></div>
        <br></br>
        <button onClick={() => this.getAirQuality()}>Get AirQuality</button>
      </div>
    );
  }
}

export default AirQuality;
