import React from 'react';
import './App.css';
import MainApp from './MainApp.js'
import { Link,Router,Route } from "react-router-dom";



function Nav() {
  return (
    <div className="nb">
     <nav  className="navbar navbar-expand-lg">
  <a  id = "moveDown" className="navbar-brand" href="#">COMP 426</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
      <li className="nav-item">
        <a id= "home" className="nav-link" tabIndex="1" href="/">Home<span className="sr-only">(current)</span></a>
      </li>
      <li className="nav-item">
        <a  id= "navaccount" className="nav-link" tabIndex="2" href="/myAccount">Account<span className="sr-only">(current)</span></a>
      </li>
     
  
      {/* <li className="nav-item">
        <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">Disabled</a>
      </li> */}
    </ul>
  </div>
</nav>
    </div>
  );
}

export default Nav;
