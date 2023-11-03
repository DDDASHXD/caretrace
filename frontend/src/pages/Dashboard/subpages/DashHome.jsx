import React from "react";

const DashHome = (props) => {
  return (
    <div className="DashHome">
      <h1>Home</h1>
      <h3>Welcome back, {props.user.name}</h3>
    </div>
  );
};

export default DashHome;
