import React, { useState, useEffect } from "react";
import "./Landing.scss";
import { Link } from "react-router-dom"; 
import logo from '../../assets/branding/logo.png'

const Landing = () => {
  const [activePage, setActivePage] = useState("");

  useEffect(() => {
    setActivePage(window.location.pathname);
  }, []);

  return (
    <div className="Landing">
      <header className="header">
        <nav>
          <ul>
            <li>
              <Link 
                to="/" 
                className={activePage === "/" ? "active-link" : ""}
              >
                HOME
              </Link>
            </li>
            <li>
              <Link 
                to="/about" 
                className={activePage === "/about" ? "active-link" : ""}
              >
                ABOUT
              </Link>
            </li>
            <li>
              <Link 
                to="/news" 
                className={activePage === "/news" ? "active-link" : ""}
              >
                NEWS
              </Link>
            </li>
          </ul>
        </nav>
      </header>

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

      <a href="#" className="contact-button">Contact</a>
    </div>
  );
};

export default Landing;
