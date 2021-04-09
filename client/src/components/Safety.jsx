/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React from 'react';
import axios from 'axios';
import SafetyData from './SafetyData.jsx';
//const { rapidApiKey } = require('../../../server/config.js');
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
    console.log('hello from getSafetyData');
    axios.put('/covid', {searchInput: this.props.searchInput }).then((response) => {
      //console.log(response.data);
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
        <div className="Safety"><h2>Covid Information:</h2>
          <SafetyData
            restrictions={this.state.restrictions}
            safetyIndex={this.state.safetyIndex}
            risk={this.state.risk}
          />
        </div>
        <br></br>
        <button onClick={() => this.getSafetyData()}>Get Covid Info</button>
      </div>
    );
  }
}

export default Safety;

