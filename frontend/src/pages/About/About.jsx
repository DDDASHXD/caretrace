import React from "react";
import "./About.scss";
import { Link } from "react-router-dom"; 
import logo from '../../assets/branding/logo.png'

const About = () => {
  return (
    <div className="About">

      <div className="logo-container">
        <img src={logo} alt="Logo" class="logo-image" />
      </div>

      <header className="header">
        <nav>
          <ul>
            <li><Link to="/">HOME</Link></li> 
            <li><Link to="/about">ABOUT</Link></li>
            <li><Link to="/work">WORK</Link></li>
          </ul>
        </nav>
      </header>

      <a href="#" className="contact-button">Contact</a>
    </div>
  );
};

export default About;
