import React, { useState, useEffect } from "react";
import "./News.scss";
import { Link } from "react-router-dom"; 
import logo from '../../assets/branding/logo.png'

const News = () => {
  const [activePage, setActivePage] = useState("");

  useEffect(() => {
    setActivePage(window.location.pathname);
  }, []);

  return (
    <div className="News">
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

      <div className="logo-container">
        <img src={logo} alt="Logo" class="logo-image" />
      </div>


      <a href="#" className="contact-button">Contact</a>
    </div>
  );
};

export default News;
