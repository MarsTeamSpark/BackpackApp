/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
// import PropTypes from 'prop-types';
// import ReactDOM from 'react-dom';

class SafetyData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div>
        <div><h3>Restrictions:</h3> {this.props.restrictions}</div>
        <div><h3>Covid Safety Index:</h3> {this.props.safetyIndex}</div>
        <div><h3>Covid Risk:</h3> {this.props.risk}</div>
      </div>
    );
  }
}

export default SafetyData;
