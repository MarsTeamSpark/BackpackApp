/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React from 'react';
import axios from 'axios';
class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      credentials: <a href="/google"> Login </a>,
      isLoggedIn: false,
      username: '',
      email: '',
      id: '',
      message: ''

    };

  }

  componentDidMount() {
    return axios.get('/testing') //checks to see if user is logged in
      .then(data => {
        console.log(data.data);
        if (data.data.displayName) {
          this.setState({credentials: <a href="/logout"> Logout </a>, isLoggedIn: true, username: data.data.displayName, email: data.data.email, id: data.data.id, message: 'Logged in as '});
        } else {
          this.setState({credentials: <a href="/google"> Login </a>, isLoggedIn: false, username: '', email: '', id: '', message: ''});
        }
      })
      .catch(err =>{
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <p>{this.state.message} {this.state.username}</p>
        {this.state.credentials}
      </div>
    );
  }
}

export default Auth;
