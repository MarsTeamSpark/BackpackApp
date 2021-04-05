/* eslint-disable no-console */
import React from 'react';
// import PropTypes from 'prop-types';
// import ReactDOM from 'react-dom';
import Safety from './Safety.jsx';
import Civics from './Civics.jsx';
class Information extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };

  }



  render() {
    console.log('Hi team. You can console log here');
    //console.log(this.props.test);
    return (
      <div style={{color: 'white'}}>
        <Safety />
        <Civics/>
      </div>
    );
  }
}

export default Information;
