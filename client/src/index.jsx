//To Do
import React from 'react';
// import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
// import styled from 'styled-components';
import GlobalStyle from './styles/GlobalStyle.js';

ReactDOM.render(
  <React.Fragment>
    <GlobalStyle/>
    <App/>
  </React.Fragment>
  , document.getElementById('app'));
