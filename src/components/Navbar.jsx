import React from "react";
import logo from "../images/logo.png";

const Navbar = (props) => {
  return (
    <div className="container">
      <nav class="navbar navbar-expand-lg navbar-light">
        {/* Container Wrapper */}
        <div className="container-fluid">
          {/* Brand Logo */}
          <a className="navbar-brand" href="#Home">
            <img className="logo" src={logo} alt="Coach Krystin Logo"></img>
          </a>
          {/* Navbar Toggler */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarToggler"
            aria-controls="navbarToggler"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarToggler">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a className="nav-link" href="Home">
                  HOME
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="MeetKrystin">
                  Meet Krystin
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="Training">
                  Training and Nutrition
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="ContactMe">
                  Contact Me
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
