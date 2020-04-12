import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {

  state = {
    scientists: [],
    leadScientists: [],
    pilots: [],
    ships: [],
    newExpedition: {
      e_name: "",
      lead_eid: 0,
      start_date: "2012-04-23T18:25:43.511Z",
      end_date: "2012-04-23T18:25:43.511Z",
      budget: 0
    },
    expedition: {
      e_name: ""
    },
    ship: {
      e_name: ""
    },
    promotedScientist: {
      eid: 0,
      status: ""
    }
  }


  componentDidMount(){
    this.getAvailScientists();
    this.getAvailPilots();
    this.promoteScientist();
  }

  // Query 1
  getCapableShips = _ => {
    var query_e_name = this.state.ship.e_name;
    axios.get('/getCapableShips?e_name=' + this.state.ship.e_name)
    .then(res => this.setState({ships: res.data}))
    .catch(err => console.log(err))
  }
  // Query 2
  getAvailScientists = _ => {
    axios.get('/getAvailScientists?e_name=' + this.state.expedition.e_name)
    .then(res => this.setState({scientists: res.data}))
    .catch(err => console.log(err))

    axios.get('/getAvailLeadScientists?e_name=' + this.state.expedition.e_name)
    .then(res => this.setState({leadScientists: res.data}))
    .catch(err => console.log(err))
  }

  // Query 3
  getAvailPilots = _ => {
    axios.get('/getAvailPilots')
    .then(res => this.setState({pilots: res.data}))
    .catch(err => console.log(err))
  }
  
  // Query 4 --> still buggy because of params
  addExpedition = _ => {
    axios.post('/addExpedition', {e_name: this.state.newExpedition.e_name, lead_eid: this.state.newExpedition.lead_eid ,
      start_date: this.state.newExpedition.start_date, end_date: this.state.newExpedition.budget})
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }

  // Query 5
  promoteScientist = _ => {
     axios.post('/promoteScientist', {eid: this.state.promotedScientist.eid})
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }

  render(){
    return (
      <div>
        <b>Promote scientist by eid:</b>
        <br></br>
        <div>
          <input value={this.state.promotedScientist.eid}
            onChange={e => this.setState({ promotedScientist: { ...this.promoteScientist, eid: e.target.value } })}
          />
          <button onClick={this.promoteScientist} > Promote scientist.</button>
        </div>
        <br></br>
        <b>Add new expedition:</b>
        <br></br>
        <div>
          Expedition name: <input value={this.state.newExpedition.e_name}
            onChange={e => this.setState({ newExpedition: { ...this.addExpedition, e_name: e.target.value } })}
          />
          <br></br>
          Lead scientist: <input value={this.state.newExpedition.lead_eid}
            onChange={e => this.setState({ newExpedition: { ...this.addExpedition, lead_eid: e.target.value } })}
          />
          <br></br>
          Start date: <input value={this.state.newExpedition.start_date}
            onChange={e => this.setState({ newExpedition: { ...this.addExpedition, start_date: e.target.value } })}
          />
          <br></br>
          End date: <input value={this.state.newExpedition.end_date}
            onChange={e => this.setState({ newExpedition: { ...this.addExpedition, end_date: e.target.value } })}
          />
          <br></br>
          <br></br>
          End date: <input value={this.state.newExpedition.budget}
            onChange={e => this.setState({ newExpedition: { ...this.addExpedition, budget: e.target.value } })}
          />
          <br></br>
          <button onClick={this.addExpedition} > Add expedition.</button>
        </div>
        <br></br>


        <b>Get capable ships by expedition name:</b>
        <br></br>
        <div>
          <input value={this.state.ship.e_name}
            onChange={e => this.setState({ ship: { ...this.getCapableShips, e_name: e.target.value } })}
          />
          <button onClick={this.getCapableShips} > Get capable ship.</button>
        </div>
        <br></br>
        <div>
        <b>Available Ships:</b>
        <br></br>
        <br></br>
          {this.state.ships.map(ship => (
            <div>
              <div>Serial number: {ship.serial_num}</div>
              <div>Model: {ship.model}</div>
              <div>s_name: {ship.s_name}</div>
              <br></br>
            </div>
          ))}
        </div>

        <br></br>
        <b>Get available scientists by expedition name:</b>
        <br></br>
        <div>
          <input value={this.state.expedition.e_name}
            onChange={e => this.setState({ expedition: { ...this.getAvailScientists, e_name: e.target.value } })}
          />
          <button onClick={this.getAvailScientists} > Get all available scientists..</button>
        </div>
        <br></br>
        <div>
        <b>Available scientists:</b>
        <br></br>
        <br></br>
          {this.state.scientists.map(scientist => (
            <div>
              <div>Eid: {scientist.eid}</div>
              <div>Full name: {scientist.full_name}</div>
              <br></br>
            </div>
          ))}
        </div>
        <br></br>
        <div>
        <b>Available lead scientists:</b>
        <br></br>
        <br></br>
          {this.state.leadScientists.map(lscientist => (
            <div>
              <div>Eid: {lscientist.eid}</div>
              <div>Full_name: {lscientist.full_name}</div>
              <br></br>
            </div>
          ))}
        </div>
      <br></br>
      <br></br>
      <b>Available pilots:</b>
      <br></br>
        <br></br>
        {this.state.pilots.map(pilot => (
          <div>
            <div>Eid: {pilot.eid}</div>
            <div>Full name: {pilot.full_name}</div>
            <br></br>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
