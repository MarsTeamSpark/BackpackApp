/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */

import React from 'react';
import styled from 'styled-components';

import Safety from './Safety.jsx';
import WalkScore from './WalkScore.jsx';
import Civics from './Civics.jsx';

const InfoBox = styled.div`
        transform: scale();
        border: 2px solid #44665c;
        text-align: left;
        border-radius: 2px;
        padding: 40px;
        width: 535px;
        height: 400px;
        overflow-x: hidden;
        overflow-y: scroll;
        box-shadow:1px 1px 1px 1px gray;
        margin: 30px 50px 20px;
        float: right;
        background-color:#f3f3f3;
`;
class Information extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };

  }
  render() {
    return (
      <InfoBox>
        <div>
          <Safety
            searchInput={this.props.searchInput}
          />
          <br></br>
          <WalkScore
            center={this.props.center}
            searchInput={this.props.searchInput}
          />
          <br></br>
          <Civics
            searchInput={this.props.searchInput}/>
        </div>
      </InfoBox>
    );
  }
}

export default Information;
