/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import axios from 'axios';
class MyBackPack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      address: '',
      phone: '',
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.add = this.add.bind(this);
  }
  componentDidMount() {
    console.log('hello from mybackpack');
    console.log(this.props.refresh);
  }
  handleNameChange(e) {
    this.setState({name: e.target.value});
  }

  handleAddressChange(e) {
    this.setState({address: e.target.value});
  }

  handlePhoneChange(e) {
    this.setState({phone: e.target.value});
  }

  add() {
    const { name, address, phone } = this.state;
    console.log(name, address, phone, this.props.userId);
    axios.post('/addcouch', {userId: this.props.userId, name: name, phone: phone, address: address})
      .then(results=> {
        console.log(results);
        this.props.refresh();
      });
  }

  render() {
    return (
      <div>
        <form id="searchForm">
          <h4>Know anybody with a spare couch?</h4>
          <input type="text" name="name" className="input" placeholder="Enter Name" onChange={this.handleNameChange}/>
          <input type="text" name="address" className="input" placeholder="Enter Address" onChange={this.handleAddressChange}/>
          <input type="text" name="phone" className="input" placeholder="Enter Phone Number" onChange={this.handlePhoneChange}/>
          <button type="button" className="input" onClick={this.add}>Add Couch</button>
        </form>
      </div>
    );
  }
}

export default MyBackPack;
