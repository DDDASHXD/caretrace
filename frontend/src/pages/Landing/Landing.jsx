import React from "react";
import "./Landing.scss";
import { Link } from "react-router-dom"; 

const Landing = () => {
  return (
    <div className="Landing">

<div className="middle-section">
        <h2>Welcome to Elder Guard</h2>
        <p>Login or Register</p>
        <div className="buttons">
          <Link to="/login" className="button">Login</Link>
          <Link to="/register" className="button">Register</Link>
        </div>
      </div>

      <div className="logo-container">
        <h1 className="title" id="logo">Elder Guard</h1> 
        <h4 id="subtitle">We Love, We Care, We Protect</h4>
      </div>

      <header className="header">
        <nav>
          <ul>
            <li><Link to="/home">HOME</Link></li> 
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
