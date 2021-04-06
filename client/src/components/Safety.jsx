/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React from 'react';
// import PropTypes from 'prop-types';
// import ReactDOM from 'react-dom';
import axios from 'axios';
const { rapidApiKey } = require('../../../server/config.js');
class Safety extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //searchInput: props.searchInput,
      restrictions: '',
      safetyIndex: '',
      risk: ''
    };

  }

  getSafetyData() {
    //const { searchInput } = this.props;
    const options = {
      method: 'GET',
      url: 'https://safe-travel-covid-index.p.rapidapi.com/safeindex',
      params: {place: `${this.props.searchInput}, USA`, lang: 'en'},
      headers: {
        'x-rapidapi-key': rapidApiKey,
        'x-rapidapi-host': 'safe-travel-covid-index.p.rapidapi.com'
      }
    };

    axios.request(options).then((response) => {
      console.log(response.data);
      this.setState({
        restrictions: response.data.restrictions,
        safetyIndex: response.data.safety_index,
        risk: response.data.risk
      });
    })
      .catch((error) => {
        console.error(error);
      });
  }

  // componentDidMount() {
  //   this.getSafetyData();
  // }

  render() {
    return (
      <div className="safety">
        {console.log('From Safety.jsx:', this.props.searchInput)}
        <div>Restrictions: {this.state.restrictions}</div>
        <div>Safety Index: {this.state.safetyIndex}</div>
        <div>Risk: {this.state.risk}</div>
        <button onClick={() => 
            
        //this.getSafetyData()
          console.log('safety funcitonality still working!')
        } disabled >Get Info</button>
      </div>
    );
  }
}

export default Safety;

