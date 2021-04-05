import React from 'react';
import axios from 'axios';

const key = 'AIzaSyAD2WZGwO_2MLEDXm4EnBjHJ4H6_tZLlV8';

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
    axios.get(`https://www.googleapis.com/civicinfo/v2/representatives?key=${key}&address=${this.state.address}`)
      .then(res => {
        //console.log('this should be an array', res.data.features[0].geometry.coordinates);
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

  render() {
    return (
      <div style={{color: 'white'}}>
        <div className="Safety"> This is where civics functionality will come in </div>
      </div>
    );
  }
}

export default Civics;
