import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  
  state = {
    scientists: [],
    pilots: [],
    promotedScientist: {
      eid: 0,
      full_name: "",
      salary: 0,
      start_date: "2009-02-15T00:00:00Z"
    }
  }

  componentDidMount(){
    this.getAvailScientists();
  }

  getAvailPilots = _ => {
    axios.get('/getAvailPilots')
    .then(res => this.setState({pilots: res.data}))
    .catch(err => console.log(err))
  }

  getAvailScientists = _ => {
    axios.get('/getAvailScientists')
    .then(res => this.setState({scientists: res.data}))
    .catch(err => console.log(err))
  }

  /*
  promoteScientist = _ => {
     axios.get('/promoteScientist')
    .then(res => this.setState({scientists: res.data}))
    .catch(err => console.log(err))
  }
  */

  render(){
    return (
      <div>
      <div>
        <input value = {this.state.promotedScientist.eid} onChange={e => this.setState( {promotedScientist: {...this.promoteScientist, eid: e.target.value}})} />
        <input value = {this.state.promotedScientist.full_name} />
        <input value = {this.state.promotedScientist.salary} />
        <input value = {this.state.promotedScientist.start_date} />
      </div>
      <br></br>
      <br></br>
      Available Scientists
      <br></br>
        {this.state.scientists.map(sci => (
          <div>
            <div>Eid: {sci.eid}</div>
            <div>Full name: {sci.full_name}</div>
            <br></br>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
