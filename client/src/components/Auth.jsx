/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React from 'react';
//import axios from 'axios';
class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      credentials: <a href="/google"> Login </a>
    };

  }

  componentDidMount() {
    console.log('hello from auth');
    // return axios.get('/google/callback')
    //   .then(res => {
    //     console.log(res);
    //   });
  }

  render() {
    return (
      <div>
        {this.state.credentials}
      </div>
    );
  }
}

export default Auth;
