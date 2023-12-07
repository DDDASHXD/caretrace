import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./About.scss";
import logo from '../../assets/branding/logo.png';

const About = () => {
  const [activePage, setActivePage] = useState("");

  useEffect(() => {
    setActivePage(window.location.pathname);
  }, []);

  return (
    <div className="About">
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

      <div className="about-section">
        <h2>About Us</h2>
        <p>Welcome to Care Trace, a compassionate and innovative project born at RUC University, Denmark. We are a dedicated team of five students committed to making a significant difference in the lives of elderly individuals, especially those battling dementia.</p>
        <p>At Care Trace, we understand the unique challenges faced by those suffering from dementia and their caregivers. The fear of a loved one wandering off and getting lost is a constant concern. That's why we've embarked on this journey to create a reliable solution - a tracking watch specifically designed for elderly residents at eldercare centers.</p>
        <p>Our team brings together a diverse blend of skills and backgrounds, united by a shared passion for technology and social care. We combine expertise in software development, user experience design, healthcare, and ethical technology to ensure our solution is not only effective but also respectful and dignified.</p>
        <p>The Care Trace watch is more than just a tracking device. It represents peace of mind for both caregivers and families, providing real-time location data while ensuring the comfort and safety of the wearer. Our technology is designed to be non-intrusive, easy to use, and highly reliable, considering the specific needs and sensitivities of elderly individuals.</p>
        <p>Through Care Trace, we aim to foster a safer environment for those with dementia, alleviating the stress for caregivers and families while empowering the wearers with a sense of independence and dignity.</p>
        <p>Join us on our mission as we strive to blend technology with care, creating a world where every individual, regardless of age or condition, can live with safety and dignity.</p>
      </div>

      <a href="#" className="contact-button">Contact</a>
    </div>
  );
};

export default About;
