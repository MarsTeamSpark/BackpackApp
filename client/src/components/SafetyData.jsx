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
        <div>Restrictions: {this.props.restrictions}</div>
        <div>Safety Index: {this.props.safetyIndex}</div>
        <div>Risk: {this.props.risk}</div>
      </div>
    );
  }
}

export default SafetyData;
