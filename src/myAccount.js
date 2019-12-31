import React from 'react';
import './App.css';
import Nav from './Nav.jsx'
import axios from 'axios';
import CardPage from './cardPage.js'
import {BrowserRouter, Route, Switch} from 'react-router-dom';

const pubRoot = new axios.create({
  baseURL: "http://localhost:3000/public"
});
const accountRoot = new axios.create({
  baseURL: "http://localhost:3000/account"
});

export class myAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        vegan: this.getVegan,
        gf: false,
        nuts: false,
        kosher: false

    };

  }
  componentDidMount = () => {
  
     
  }

//   getVegan = () = => {

//   }

  handleDeleteAccount = event => {
    event.preventDefault();

    accountRoot.post('/delete', {
      "name": this.state.login,
      "pass": this.state.password,
      // "vegan": this.state.vegan,
      "data": {
        "role": 2,
        "description": "New User"
      }
    })
      .then(res => {
        alert("Account Deleted?????");
        console.log(res);
        console.log(res.data);
      })
      
  }

  handleUpdateAccount = event => {
    alert("Preferences Successfully Updated!");
    event.preventDefault();
    
    accountRoot.post('/put', {
      "vegan": this.state.vegan,
      "gf": this.state.gf,
      "nuts": this.state.nuts,
      "kosher": this.state.kosher,
      "data": {
        "role": 2,
        "description": "New User"
      }
    })
      .then(res => {
        alert("Account Updated?????");
        console.log(res);
        console.log(res.data);
      })
      
  }

  saveVegan = event => {
    this.setState({ vegan: event.target.value });
  }
  saveGF = event => {
    this.setState({ gf: event.target.value });
  }
  saveNut = event => {
    this.setState({ nuts: event.target.value });
  }
  saveKosher = event => {
    this.setState({ kosher: event.target.value });
  }

  
  render() {
      console.log('hit')
    return (
      <div>
        <section class="hero is-primary">
  <div class="hero-body">
    <div class="container">
      <h1 class="title">
        My Account
      </h1>
      <h2 class="subtitle">
        Edit and View Preferences
      </h2>
    </div>
  </div>
</section>

<section class="section">
    <div class="container">
      <h1 class="title">My Preferences:</h1> <br></br>
      <input onChange={this.saveVegan} type="checkbox" name="Password" /><strong>Vegan</strong> <br></br>
      <input onChange={this.saveGF} type="checkbox" name="Password"/><strong>Gluten Free</strong> <br></br>
      <input onChange={this.saveNut} type="checkbox" name="Password"/><strong>Nut Allergy</strong> <br></br>
      <input onChange={this.saveKosher} type="checkbox" name="Password" /><strong>Kosher</strong>
      {/* {...state.kosher===true ? checked = true : checked = false} */}
    </div>
  </section>
<section class="container">
  <div class="buttons">
  <button onClick = {this.handleUpdateAccount} class="button is-info">Update Preferences</button>
  <button onClick = {this.handleDeleteAccount} class="button is-danger">Delete Account</button>
</div>
</section>
      </div>
    )

    // this.on('click', '.log-out', handleLogOut);
  }
  
}

export default myAccount;
