/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React from 'react';
// import PropTypes from 'prop-types';
// import ReactDOM from 'react-dom';
import Safety from './Safety.jsx';
import Civics from './Civics.jsx';
class Information extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // searchInput: props.searchInput
    };

  }



  render() {
    console.log('From Information.jsx:', this.props.searchInput);
    //console.log(this.props.test);
    //const { searchInput } = this.props;
    return (
      <div>
        <Safety
          searchInput={this.props.searchInput}
        />
        <Civics
          searchInput={this.props.searchInput}/>
      </div>
    );
  }
}

export default Information;
