import React from 'react';
// import PropTypes from 'prop-types';
// import ReactDOM from 'react-dom';
import Route from './Route.jsx';
import Safety from './Safety.jsx';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
    
  }



  render() {
    return (

      <div className="map">
        <div> I am the map! </div>
        <Safety/>
        <Route/>
      </div>
    );
  }
}

export default Map;
