import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component() {
  
  state = {
    pilots: null
  }

  componentDidMount(){
    axios.get('/pilots')
      .then(res => this.setState({pilots: res.data}))
      .catch(err => console.log(err))
  }

  render(){
    return (
      <div>
        {this.state.pilots 
        ? <div> {this.state.pilots } </div>
        : null }
      </div>
    );
  }
}

export default App;
