/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';

class SafetyData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div>
        <div><h3>Covid Risk:</h3> <h5>{this.props.risk}</h5></div>
        <div><h3>Covid Safety Index:</h3> <h5>{Math.round(this.props.safetyIndex)}/10</h5></div>
        <div><h3>Restrictions:</h3> <h5>{this.props.restrictions}</h5></div>
      </div>
    );
  }
}

export default SafetyData;
