import React from "react";
import "./Landing.scss";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className="Landing">
      <div className="logo-container">
        <h1 className="titlke" id="logo">Elder Guard</h1>
        <h4 id="subtitle">We Love, We Care, We Protect</h4>
      </div>

      <div className="sidebar" id="mySidebar">
        <h2 id="sidebarTitle">MENU</h2>
        <a href="#" id="homeBtn" className="btn">Home page</a>
        <a href="#" id="aboutBtn" className="btn">About Us</a>
        <a href="#" id="loginBtn" className="btn">Login</a>
        <a href="#" id="registerBtn" className="btn">Register</a>
      </div>

      <div className="typing-container">
        <span id="sentence"></span>
      </div>
      <a href="#" id="contactBtn" className="contact-button">Contact</a>
    </div>
  );
};

export default Landing;
