import React from 'react';
// import PropTypes from 'prop-types';
// import ReactDOM from 'react-dom';
import Map from './Map.jsx';
import Route from './Route.jsx';
import Safety from './Safety.jsx';
const { mapKey } = require('../../../server/config');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };

  }



  render() {
    return (
      <div>
        <Route />
        <Safety />
        <div style={{width: '50vw', height: '80vh'}}>
          <Map
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${mapKey}`}
            loadingElement={<div style={{ height: '80%'}} />}
            containerElement={<div style={{ height: '80%'}} />}
            mapElement={<div style={{ height: '80%'}} />}
          />
        </div>
      </div>
    );
  }
}

export default App;
