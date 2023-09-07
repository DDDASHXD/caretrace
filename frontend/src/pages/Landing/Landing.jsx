import React from "react";
import "./Landing.scss";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className="Landing">
      <h1>CareTrace</h1>
      <button onClick={() => navigate("/login")}>Login</button>
      <button onClick={() => navigate("/register")}>Register</button>
    </div>
  );
};

export default Landing;
