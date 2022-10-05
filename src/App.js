import './App.css';
import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import logo from "./images/logo.png";
import {FaBars} from "react-icons/all"

function App() {
  return (
    <BrowserRouter>
    <div>
      <Navbar expand="md">
        <Navbar.Brand href='#home'>
          <a className='navbar-brand' href='/home'>
            <img src={logo}></img>
          </a>
        </Navbar.Brand>
        <Navbar.Toggle className='primary' aria-controls='basic-navbar-nav'>
          <FaBars size={30}/>
        </Navbar.Toggle>
        <Navbar.Collapse>
          <ul className='navbar-nav d-flex'>
            <li className='nav-item text-center'>
              <Link className='nav-link' to="/aboutMe">Meet Krystin</Link>
            </li>
            <li className='nav-item text-center'>
              <Link className='nav-link' to="/services">Training and Nutrition</Link>
            </li>
            <li className='nav-item text-center'>
              <Link className='nav-link' to="/contact">Contact Me</Link>
            </li>
          </ul>
        </Navbar.Collapse>
      </Navbar>
    </div>
    </BrowserRouter>
  );
}

export default App;
