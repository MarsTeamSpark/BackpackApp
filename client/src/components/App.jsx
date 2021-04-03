import React from 'react';
// import PropTypes from 'prop-types';
// import ReactDOM from 'react-dom';
import Map from './Map.jsx';
import Route from './Route.jsx';
import Safety from './Safety.jsx';

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
        <div style={{width: '100vw', height: '100vh'}}>
          <Map
            googleMapURL={'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places'}
            loadingElement={<div style={{ height: '100%'}} />}
            containerElement={<div style={{ height: '100%'}} />}
            mapElement={<div style={{ height: '100%'}} />}
          />
        </div>
      </div>
    );
  }
}

export default App;
