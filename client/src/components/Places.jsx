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
        <tr>
          <td><img src={'/assets/img/home.png'} onClick={this.props.getHostels}></img></td>
          <td><img src={'/assets/img/green_cross.png'} onClick={this.props.getDispensary}></img></td>
          <td><img src={'/assets/img/tent2.png'} onClick={this.props.getStateParks}></img></td>
        </tr>
      </div>
    );
  }
}

export default Places;
