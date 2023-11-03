import React from "react";

const DashHome = (props) => {
  return (
    <div className="DashHome">
      <h1>Home</h1>
      <h3>Welcome back, {props.user.name}</h3>
      <div className={`indicator ${props.user.isVerified ? "verified" : ""}`}>
        {props.user.isVerified ? "Verified" : "Not verified"}
      </div>
    </div>
  );
};

export default DashHome;
