import React from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { getUser, setUser } from "../../helpers/localstorage";
import axios from "axios";

import AccessForm from "../../layouts/AccessForm/AccessForm";
import Input from "../../components/Input/Input";

const Login = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    const localUser = getUser();

    if (localUser) navigate("/dashboard");
  }, []);

  const handleLogin = async () => {
    await axios
      .post("http://172.20.10.3:5000/login", {
        username,
        password,
      })
      .then((e) => {
        setUser(e.data);
        navigate("/dashboard");
      })
      .catch((e) => {
        setError(`User not found.\nPlease double check information.`);
      });
  };

  return (
    <AccessForm>
      <div className="login inner">
        <h2 className="title">Welcome back</h2>
        {error && <p className="error">{error}</p>}
        <Input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={() => handleLogin()}
          disabled={username.length > 0 && password.length > 0 ? false : true}
        >
          Sign in
        </button>
        <div className="links">
          <a href="/forgotpassword">Forgot password?</a>
          <a href="/register">Register new user</a>
        </div>
      </div>
    </AccessForm>
  );
};

export default Login;
