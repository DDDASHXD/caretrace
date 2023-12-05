import React from "react";
import "./Register.scss";
import AccessForm from "../../layouts/AccessForm/AccessForm";
import axios from "axios";
import Input from "../../components/Input/Input";
import { useNavigate } from "react-router-dom";
import { getUser, setUser } from "../../helpers/localstorage";
import { sendConfirmationEmail } from "../../helpers/emailjs";

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const Register = () => {
  const [name, setName] = React.useState("");
  const [surname, setSurname] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");

  const [error, setError] = React.useState("");

  const navigate = useNavigate();

  const register = async () => {
    if (password === passwordConfirm) {
      await axios
        .post("http://172.20.10.3:5000/register", {
          name,
          surname,
          username,
          email,
          password,
        })
        .then((e) => {
          sendConfirmationEmail(email, e.data.confirmationToken);
          navigate("/login");
        })
        .catch((e) => {
          console.log(e);
          setError(
            "An error occurred. Please double check username and password."
          );
        });
    } else {
      setError("Please make sure passwords match.");
    }
  };

  React.useEffect(() => {
    const localUser = getUser();
    if (localUser) navigate("/dashboard");
  }, []);

  return (
    <AccessForm>
      <div className="Register inner">
        <h2 className="title">Register</h2>
        {error && <p className="error">{error}</p>}
        <Input
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Surname"
          onChange={(e) => setSurname(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Confirm password"
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        <button
          onClick={() => register()}
          disabled={
            name.length > 1 &&
            surname.length > 0 &&
            username.length > 2 &&
            emailPattern.test(email) &&
            password.length > 7 &&
            passwordConfirm.length > 0
              ? false
              : true
          }
        >
          Sign up
        </button>
        <div className="links">
          <a href="/login">Already have an account?</a>
        </div>
      </div>
    </AccessForm>
  );
};

export default Register;
