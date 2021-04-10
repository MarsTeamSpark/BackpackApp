/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import styled from 'styled-components';

import Auth from './Auth.jsx';

const NavStyle = styled.div`
  position: sticky;
  top: 0;
  width: 97.5vw;
  background:	#7bbcb6;
  margin: 0px;
  padding: 0.5rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  user-select: none;
  box-shadow: 0 1px 6px rgba(25, 25, 25, 1);
`;

const LogoStyle = styled.div`
  font-weight: 900;
  font-size: .8em;
  margin-right: auto;
  margin-left: 15px;
  cursor: pointer;
`;

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {
    return (
      <NavStyle>
        <LogoStyle>
          <h1>Back-Pack</h1>
          <br></br>


          <h3>We got your back!</h3>
        </LogoStyle>
        <div>
          <Auth logInInfo={ this.props.logInInfo }/>
        </div>
        <br></br>
      </NavStyle>
    );
  }
}

export default NavBar;
