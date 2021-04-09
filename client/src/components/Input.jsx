/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import styled from 'styled-components';


const InputStyle = styled.div`


`;

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };

  }



  render() {
    return (
      <div>
        <InputStyle>
          <form id="searchForm">
            <input type="text" name="search" className="input" placeholder="Search a city" onChange={this.props.handleSearchChange}/>
            <button type="button" className="input" onClick={this.props.primarySearch}>Search</button>
          </form>
          <form id="form">
            <input type="text" name="start" className="input" placeholder="Choose Starting Point" onChange={this.props.handleStartChange}/>
            <input type="text" name="end" className="input" placeholder="Choose Destination" onChange={this.props.handleEndChange}/>
            <button type="button" className="input" onClick={this.props.getRoute}>Get Route</button>
          </form>
        </InputStyle>
      </div>
    );
  }
}

export default Input;
