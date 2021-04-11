/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React from 'react';
import axios from 'axios';
class WalkScore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      walkScore: null,
      walkDescription: '',
      bikeScore: null,
      bikeDescription: ''
    };
  }

  getWalkScore() {
    axios.put('/walk', this.props.center).then((response) => {
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

  render() {
    return (
      <div >
        <div className="Safety"> <h2>Walkability:</h2> </div>
        <div><h3>Walk Score:</h3> <h5>{this.state.walkScore}</h5></div>
        <div><h3>Walk Description:</h3> <h5>{this.state.walkDescription}</h5></div>
        <div><h3>Bike Score:</h3> <h5>{this.state.bikeScore}</h5></div>
        <div><h3>Bike Description:</h3> {this.state.bikeDescription}</div>
        <br></br>
        <button onClick={() => this.getWalkScore()}>Get Walk Score</button>
      </div>
    );
  }
}

export default WalkScore;



