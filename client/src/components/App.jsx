import React from 'react';
// import PropTypes from 'prop-types';
// import ReactDOM from 'react-dom';
import Map from './Map.jsx';
import Route from './Route.jsx';
import Safety from './Safety.jsx';
import Civics from './Civics.jsx';
import { mapKey } from '../../../server/config.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };

  }



  render() {
    return (
      <div>
        <div style={{width: '50vw', height: '80vh'}}>
          <Route />
          <Safety />
          <Map
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${mapKey}`}
            loadingElement={<div style={{ height: '80%'}} />}
            containerElement={<div style={{ height: '80%'}} />}
            mapElement={<div style={{ height: '80%'}} />}
          />
        </div>
        <Civics/>
      </div>
    );
  }
}

export default App;
