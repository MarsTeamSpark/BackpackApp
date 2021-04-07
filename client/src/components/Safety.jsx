/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React from 'react';
import axios from 'axios';
import SafetyData from './SafetyData.jsx';
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
      <div >
        <div className="Safety">
          <SafetyData
            restrictions={this.state.restrictions}
            safetyIndex={this.state.safetyIndex}
            risk={this.state.risk}
          />
        </div>
        <button onClick={() => this.getSafetyData()}>Get Info</button>
      </div>
    );
  }
}

export default Safety;

