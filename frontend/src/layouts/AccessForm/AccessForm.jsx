import React from "react";
import "./AccessForm.scss";
import mainbg from "../../assets/images/mainbg.png";

const AccessForm = (props) => {
  return (
    <div className="AccessForm">
      <img src={mainbg} alt="" className="art" />
      <div className="form">{props.children}</div>
    </div>
  );
};

export default AccessForm;
