import React from 'react';
import './App.css';
import Nav from './Nav.jsx'
import MyAccount from './myAccount.js'
import axios from 'axios';
import CardPage from './cardPage.js'
import {BrowserRouter, Route, Switch} from 'react-router-dom';

const pubRoot = new axios.create({
  baseURL: "http://localhost:3000/public"
});
const accountRoot = new axios.create({
  baseURL: "http://localhost:3000/account"
});

const userRoot = new axios.create({
  baseURL: "http://localhost:3000/user"
});

export class MainApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      guest: true,
      name: "",
      person:[],
      login: '',
      password: "",
      start: 0,
      newAccount: false,
      vegan: false,
      gf: false,
      nuts: false,
      kosher: false
    };

  }
  componentDidMount = () => {
  
     
  }
  handleChange = event => {
    this.setState({ name: event.target.value });
  }
  handleChangeLogin = event => {
    this.setState({ login: event.target.value });
  }

  handleChangePassword = event => {
    this.setState({ password: event.target.value });
  }
  
  handleSubmitLogin = event => {
    event.preventDefault();

    accountRoot.post('/login', {
      "name": this.state.login,
      "pass": this.state.password
    })
      .then(res => {
        if(res.status === 200){
          alert("Succesfully Logged In as: " + this.state.login);
          this.setState({
            start: 200,
            guest: false
          })
        } 
        console.log(res);
        console.log(res.data);
       
      })
      .catch(err => {if(err.status !== 200) { console.log("FAIL!"); alert("Wrong Username or Password");}});

      
      // alert("Username or Password Not Recognized");
      
  }
  handleCreateNew = event => {
    event.preventDefault();

    accountRoot.post('/create', {
      "name": this.state.login,
      "pass": this.state.password,
      // "vegan": this.state.vegan,
      "data": {
        "role": 2,
        "description": "New User"
      }
    })
      .then(res => {
        alert("Account created Succesfully");
        this.setState({newAccount: false});
        console.log(res);
        console.log(res.data);
      })


      // ---------------
  
      // userRoot.post('/create', {
      //   "name":this.state.login,
      //   "vegan": this.state.vegan,
      //   "gf": this.state.gf,
      //   "nuts": this.state.nuts,
      //   "kosher": this.state.kosher,
      //   "data": {
      //     "role": 2,
      //     "description": "New User"
      //   }
      // })
      //   .then(res => {
      //     alert("Account created Succesfully");
      //     // this.setState({newAccount: false});
      //     console.log(res);
      //     console.log(res.data);
      //   })
      
  }

  
  
  handleSubmit = event => {
    event.preventDefault();

    const data = {
       "authors":{"first": this.state.name}
    };

    pubRoot.post('/examplePost', { data })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
      
  }
  handleContinueAsGuest = event => {
    
    this.setState({
      start: 200
    })
    // this.renderPage();
  }

  handleLogOut = event => {
    // alert("yo");
    this.setState({newAccount: false});
  }

  handleSubmit2 = event => {
    event.preventDefault();

    const data = {
       "authors":{"first": this.state.name}
    };

    pubRoot.get('/examplePost/authors', { data })
      .then(res => {
        console.log(res.data);
        if(res.data.result.first === this.state.name){
          this.setState({login: "200"})
        }
      
      })
  }
  changeNewAccountState = () =>{

    this.setState({newAccount: true});

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



  renderRegistration(){
    return (
    <div className="register">
      <section class="container">
         <h1 className = "regHead">New User Registration</h1>
         {/* <br></br> */}
         <a href="#" className = "return"  onClick ={this.handleLogOut}><p>Return to Login</p></a>
      </section>
      <form onSubmit={this.handleCreateNew}>
      <label>
      <strong>Username:</strong> <br></br>
        <input type="text" name="Login" onChange={this.handleChangeLogin} />
      </label>
      <label>
      <strong>Password:</strong>
        <input type="text" name="Password" onChange={this.handleChangePassword} />
      </label>
      
      <input onChange={this.saveVegan} type="checkbox" name="Password"/> I am Vegan <br></br>
      <input onChange={this.saveGF} type="checkbox" name="Password"/> I am Gluten Free <br></br>
      <input onChange={this.saveNut} type="checkbox" name="Password"/> I have a Nut Allergy <br></br>
      <input onChange={this.saveKosher} type="checkbox" name="Password"/> I keep Kosher
    
      <button onClick={this.handleStorePrefs} class ="button is-success is-light" type="submit">Create New User</button>
    </form>
  </div>
    )
  }
  renderLogin(){
    // return (<h className = "regHead">Welcome,<br></br>Please Log In Here</h>);
    return (
      // <div><h className = "regHead">Welcome,<br></br>Please Log In Here</h></div>
      <div class = "card">

        {/* <h1 className = "regHead">Welcome,<br></br>Please Log In Here</h1> */}
        <h1 class="card-header">Welcome,<br></br>Please Log In Here</h1>

    <div class="">
      
        <form class="field" onSubmit={this.handleSubmitLogin}>
          <label class="label">
            <strong>Username:</strong> <br></br>
            <input type="text" name="Login" onChange={this.handleChangeLogin} />
          </label>
        
          
          <label class="label">
          <strong>Password:</strong>
            <input type="text" name="Password" onChange={this.handleChangePassword} />
          </label>
          <button class ="button is-success is-center" type="submit">Login</button>
        </form>

    </div>
        <p className="return">Continue as Guest? Click <a href="#" onClick={this.handleContinueAsGuest}>Here</a></p>
        <br></br>
        <p className="return">Or, <a href="#" onClick={this.changeNewAccountState}>Create A New Account</a></p>


        
      </div>
    );

  }
  renderStart(){
    
    return (
      <div className = "start">
         <div>
        {this.state.newAccount === false
          ? this.renderLogin()
          : this.renderRegistration()}
      </div>

      </div>
    );

  }

  renderPage() {
    return (
      <div>
         <BrowserRouter>
              <div>
                <Route component={Nav}></Route>

                <Switch>
                
                  <Route exact path='/' exact render={(props) => (<CardPage guest = {this.state.guest}/>)}/>
                  <Route exact path='/myAccount' exact render={(props) => (<MyAccount/>)}/>
                  

                </Switch>
               
              </div>
            </BrowserRouter>
            
       <main>

        </main>
      </div>
    )

  }
  render() {
    // this.on('click', '#navaccount', handleLogOut);
    return (
      <div>
        {this.state.start === 0
          ? this.renderStart()
          : this.renderPage()}
      </div>
    )

    
  }
  
}

export default MainApp;
