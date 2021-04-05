/* eslint-disable camelcase */
import React from 'react';
import axios from 'axios';
import Reps from './Reps.jsx';

const { civics_key } = require('../../../server/config.js');

class Civics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '1300 Perdido St New Orleans LA',
      senators: [],
      reps: [],
        
    };
    this.getCivicsInformation = this.getCivicsInformation.bind(this);

  }

  getCivicsInformation() {
    axios.get(`https://www.googleapis.com/civicinfo/v2/representatives?key=${civics_key}&address=${this.state.address}`)
      .then(res => {
        const senatorObjs = [];
        const repObjs = [];
        for (let i = 0; i < res.data.offices.length; i++) {
          const index = res.data.offices[i];
          if (index.name === 'U.S. Senator') {
            for (let j = 0; j < index.officialIndices.length; j++) {
              senatorObjs.push({
                image: res.data.officials[index.officialIndices[j]].photoUrl,
                name: res.data.officials[index.officialIndices[j]].name,
                position: 'United States Senate',
                party: res.data.officials[index.officialIndices[j]].party,
                phone: res.data.officials[index.officialIndices[j]].phones[0] || 'Not Found',
              });
            }
          } else if (index.name === 'U.S Representative') {
            for (let h = 0; h < index.officialIndices.length; h++) {
              repObjs.push({
                image: res.data.officials[index.officialIndices[h]].photoUrl,
                name: res.data.officials[index.officialIndices[h]].name,
                position: 'United States House of Representatives',
                party: res.data.officials[index.officialIndices[h]].party,
                phone: res.data.officials[index.officialIndices[h]].phones[0] || 'Not Found',
              });
            }
          }
        }
        this.setState({
          senators: senatorObjs,
          reps: repObjs
        });
      })
      .catch(err => {
        alert(`error: ${err}`);
      });
  }

  componentDidMount() {
    this.getCivicsInformation();
  }

  render() {
    const { senators, reps } = this.state;
    return (
      <div style={{color: 'white'}}>
        <div className="Senators">
          {
            senators.map(sen => {
              <Reps 
                image={sen.image} 
                name={sen.name} 
                position={sen.position} 
                party={sen.party} 
                phone={sen.phone}
              />;
            })
          }</div>
        <div>
          {
            reps.map(rep => {
              <Reps 
                image={rep.image} 
                name={rep.name} 
                position={rep.position} 
                party={rep.party} 
                phone={rep.phone}
              />;
            })
          }
        </div>
      </div>
    );
  }
}

export default Civics;
