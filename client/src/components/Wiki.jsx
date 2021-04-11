/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React from 'react';
// import PropTypes from 'prop-types';
// import ReactDOM from 'react-dom';
import axios from 'axios';
//const { rapidApiKey } = require('../../../server/config.js');

class Wiki extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wikiBlurb: ''
    };

  }

  getWiki() {
    console.log('hello from wiki');
    axios.put('/wiki').then((response) => {
      //console.log(response.data);
      this.setState({
        wikiBlurb: response.data.blurb,
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
        <div className="Safety"> <h2>Regional Info:</h2> </div>
        <p>{this.state.wikiBlurb}</p>
        <button onClick={() => this.getWiki()}>Get Info</button>
      </div>
    );
  }
}

export default Wiki;
