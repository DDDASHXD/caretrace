import React from "react";
import "./ForgotPassword.scss";
import axios from "axios";
import { sendPasswordResetEmail } from "../../helpers/emailjs";

import AccessForm from "../../layouts/AccessForm/AccessForm";
import Input from "../../components/Input/Input";
import { useNavigate } from "react-router-dom";

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const ForgotPassword = () => {
  const [email, setEmail] = React.useState("");
  const navigate = useNavigate();

  const handleClick = async () => {
    axios
      .post("http://localhost:5000/requestPasswordReset", {
        email,
      })
      .then((e) => {
        sendPasswordResetEmail(email, e.data.user, e.data.token);
        navigate("/login");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <AccessForm>
      <div className="ForgotPassword inner">
        <h2 className="title">Forgot your password?</h2>
        <p>
          Please enter your email below, and we'll send you a link to reset your
          password.
        </p>
        <Input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          disabled={emailPattern.test(email) ? false : true}
          onClick={() => handleClick()}
        >
          Send link
        </button>
      </div>
    </AccessForm>
  );
};

export default ForgotPassword;
