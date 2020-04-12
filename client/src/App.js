import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  
  state = {
    pilots: []
  }

  componentDidMount(){
    axios.get('/pilots')
      .then(res => this.setState({pilots: res.data}))
      .catch(err => console.log(err))
  }

  render(){
    if(!this.state.pilots.length){
      return <div>"There are no pilots.</div>;
    }
    return (
      <div>
        {this.state.pilots.map(pilot => (
          <div>
            <div>{pilot.eid}</div>
            <div> {pilot.full_name}</div>
            <div>{pilot.salary} </div>
            <div>{pilot.start_date} </div>
            <br></br>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
