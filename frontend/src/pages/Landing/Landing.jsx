import React from "react";
import "./Landing.scss";
import { Link } from "react-router-dom"; 
import logo from '../../assets/branding/logo.png'

const Landing = () => {
  return (
    <div className="Landing">

<div className="middle-section">
        <h2>Welcome to Care Trace</h2>
        <p>We Love, We Care, We Protect</p>
        <div className="buttons">
          <Link to="/login" className="button">Login</Link>
          <p5>or</p5>
          <Link to="/register" className="button">Register</Link>
        </div>
      </div>

      <div className="logo-container">
        <img src={logo} alt="Logo" class="logo-image" />
      </div>

      <header className="header">
        <nav>
          <ul>
            <li><Link to="/landing">HOME</Link></li> 
            <li><Link to="/about">ABOUT</Link></li>
            <li><Link to="/work">WORK</Link></li>
          </ul>
        </nav>
      </header>

      <a href="#" className="contact-button">Contact</a>
    </div>
  );
};

export default Landing;
