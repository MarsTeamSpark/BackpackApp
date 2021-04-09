/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-key */
/* eslint-disable no-console */
/* eslint-disable camelcase */
//small change

import React from 'react';
import axios from 'axios';
import Reps from './Reps.jsx';

const { civics_key } = require('../../../server/config.js');

class Civics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      senators: [],
      reps: [],
    };
    this.getCivicsInformation = this.getCivicsInformation.bind(this);

  }

  getCivicsInformation() {
    //console.log('hello from getCivicsInfo');
    axios.put('/civic', {searchInput: this.props.searchInput})
      .then(response => {
        //console.log(response.data);
        this.setState({
          senators: response.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { senators } = this.state;
    return (
      <div>
        <div className="Senators">
          {
            senators.map(sen => (
              <Reps
                image={sen.image}
                name={sen.name}
                position={sen.position}
                party={sen.party}
                phone={sen.phone}
              />
            ))
          }
        </div>
        <button onClick={() =>

          this.getCivicsInformation()

        }>Get Civic Info</button>
      </div>
    );
  }
}

export default Civics;
