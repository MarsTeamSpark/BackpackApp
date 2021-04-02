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
      <div>
        <div className="Map"> I am the map! </div>
        <Safety/>
        <Route/>
      </div>
    );
  }
}

export default Map;
