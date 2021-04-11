/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
// import PropTypes from 'prop-types';
// import ReactDOM from 'react-dom';

class Places extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };

  }

  render () {
    return (
      <div>
        <button onClick={this.props.getHostels}>Get Nearby Hostels</button>
        <button>Get Nearby Dispensaries</button>
      </div>
    );
  }
}

export default Places;
