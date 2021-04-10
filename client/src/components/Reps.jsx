/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
// import PropTypes from 'prop-types';
// import ReactDOM from 'react-dom';

class Reps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };

  }



  render() {
    return (
      <div>
        <h2>{this.props.name}</h2>
        {/* <img src={this.props.image} className="image-container"/> */}
        <div>Position: {this.props.position}</div>
        <div>Party: {this.props.party}</div>
        <div>Phone: {this.props.phone}</div>
      </div>
    );
  }
}

export default Reps;

