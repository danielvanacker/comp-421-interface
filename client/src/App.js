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
      start_date: "",
      end_date: "",
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
    },
    terminte: null,
    add_expedition_message: "",
    promoteScientist_message: ""
  }


  componentDidMount() {
    //this.getAvailPilots();
    //this.getCapableShips();

    //this.promoteScientist();
    //this.terminateProgram();
    //this.getAvailScientists(); this crashes when called but still works??
    //this.addExpedition();
  }

  // Query 1
  getCapableShips = _ => {
    var query_e_name = this.state.ship.e_name;
    axios.get('/getCapableShips?e_name=' + this.state.ship.e_name)
      .then(res => this.setState({ ships: res.data }))
      .catch(err => console.log(err))
  }
  // Query 2
  getAvailScientists = _ => {
    axios.get('/getAvailScientists?e_name=' + this.state.expedition.e_name)
      .then(res => this.setState({ scientists: res.data }))
      .catch(err => console.log(err))

    axios.get('/getAvailLeadScientists?e_name=' + this.state.expedition.e_name)
      .then(res => this.setState({ leadScientists: res.data }))
      .catch(err => console.log(err))
  }

  // Query 3
  getAvailPilots = _ => {
    axios.get('/getAvailPilots')
      .then(res => this.setState({ pilots: res.data }))
      .catch(err => console.log(err))
  }

  // Query 4 
  addExpedition = _ => {
    console.log(this.state.newExpedition)
    axios.post('/addExpedition', {
      e_name: this.state.newExpedition.e_name, lead_eid: this.state.newExpedition.lead_eid,
      start_date: this.state.newExpedition.start_date, end_date: this.state.newExpedition.end_date,
      budget: this.state.newExpedition.budget
    })
      .then(res => this.setState({add_expedition_message: res.data.message}))
      .catch(err => {
        console.log(err);
        this.setState({add_expedition_message: "Invalid"})
      })
  }

  // Query 5
  promoteScientist = _ => {
    if(!isNaN(this.state.promotedScientist.eid)) {
      axios.post('/promoteScientist', { eid: this.state.promotedScientist.eid})
      .then(res => this.setState({promoteScientist_message: res.data.message }))
      .catch(err => {
        console.log(err);
        this.setState({promoteScientist_message: "Invalid"})
      })
    }
    else {
      console.log(!isNaN(this.state.promotedScientist.eid))
      console.log(this.state.promotedScientist.eid)
      this.setState({promoteScientist_message: "Invalid input" })
    }
  }

  // Terminate
  terminateProgram = _ => {
    axios.get('/terminate')
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div class="content">
        <div class="title"><b><u>Welcome to Horizon's Edge Mission Control</u></b></div>
        <b>Promote scientist by eid:</b>
        <div>
          <input value={this.state.promotedScientist.eid}
            onChange={e => this.setState({ promotedScientist: { ...this.promoteScientist, eid: e.target.value } })}
          />
          <button onClick={this.promoteScientist} > Promote scientist.</button>
          <div>Message: {this.state.promoteScientist_message}</div>
        </div>

        <div class="newExpedition">
          <b>Add new expedition:</b>
          <div>
            Expedition name: <input value={this.state.newExpedition.e_name}
              onChange={e => this.setState({ newExpedition: { ...this.state.newExpedition, e_name: e.target.value } })}
            />
            Lead scientist: <input value={this.state.newExpedition.lead_eid}
              onChange={e => this.setState({ ...this.state, newExpedition: { ...this.state.newExpedition, lead_eid: e.target.value } })}
            />
            Start date: <input value={this.state.newExpedition.start_date}
              onChange={e => this.setState({ ...this.state, newExpedition: { ...this.state.newExpedition, start_date: e.target.value } })}
            />
            End date: <input value={this.state.newExpedition.end_date}
              onChange={e => this.setState({ ...this.state, newExpedition: { ...this.state.newExpedition, end_date: e.target.value } })}
            />
            Budget: <input value={this.state.newExpedition.budget}
              onChange={e => this.setState({ ...this.state, newExpedition: { ...this.state.newExpedition, budget: e.target.value } })}
            />
            <button onClick={this.addExpedition} > Add expedition.</button>
            <div>Message: {this.state.add_expedition_message}</div>
          </div>
        </div>

        <div class="capableShips">
          <b>Get capable ships by expedition name:</b>
          <br></br>
          <div>
            <input value={this.state.ship.e_name}
              onChange={e => this.setState({ ship: { ...this.getCapableShips, e_name: e.target.value } })}
            />
            <button onClick={this.getCapableShips} > Get capable ship.</button>
          </div>
          <div>
            <b>Available Ships:</b>
            <table>
              <tr>
                <td>Serial Number</td>
                <td>Model</td>
                <td>Ship Name</td>
              </tr>
            {this.state.ships.map(ship => (
              <tr>
                <td>{ship.serial_num}</td>
                <td>{ship.model}</td>
                <td>{ship.s_name}</td>
              </tr>
            ))}
            </table>
          </div>
        </div>

        <div class="scientists"></div>
        <b>Get available scientists by expedition name:</b>
        <br></br>
        <div>
          <input value={this.state.expedition.e_name}
            onChange={e => this.setState({ expedition: { ...this.getAvailScientists, e_name: e.target.value } })}
          />
          <button onClick={this.getAvailScientists} > Get all available scientists..</button>
        </div>

        <div class="scientistgrid">
          <div>
            <b>Available scientists:</b>
            <table>
            <tr>
                <td><b>Eid</b></td>
                <td><b>Full Name</b></td>
              </tr>
            {this.state.scientists.map(scientist => (
              <tr>
                <td>{scientist.eid}</td>
                <td>{scientist.full_name}</td>
              </tr>
            ))}
            </table>
          </div>
          <br></br>
          <div>
            <b>Available lead scientists:</b>
            <table>
            {this.state.leadScientists.map(lscientist => (
              <tr>
                <td>{lscientist.eid}</td>
                <td>{lscientist.full_name}</td>
              </tr>
            ))}
            </table>
          </div>
        </div>

        <div class="pilots">
          <button onClick={this.getAvailPilots} > Get available pilots.</button>
          <b>Available pilots:</b>
          <table>
            <tr>
              <th>Eid</th>
              <th>Full Name</th>
            </tr>
          {this.state.pilots.map(pilot => (
            <tr>
              <td>{pilot.eid}</td>
              <td>{pilot.full_name}</td>
            </tr>
          ))}
          </table>
        </div>
        <div><button onClick={this.terminateProgram} > Exit Program.</button> </div>
      </div>

    );
  }
}

export default App;
