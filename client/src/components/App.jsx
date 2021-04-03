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
        <Map/>
        <Route />
        <Safety />
      </div>
    );
  }
}

export default App;
