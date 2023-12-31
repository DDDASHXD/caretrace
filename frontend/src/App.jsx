import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import { getUser, setUser } from "./helpers/localstorage";
import "./global.scss";
import { io } from "socket.io-client";

import Landing from "./pages/Landing/Landing";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import NotFound from "./pages/NotFound/NotFound";
import Confirm from "./pages/Confirm/Confirm";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import SocketTest from "./pages/SocketTest/SocketTest";
import About from "./pages/About/About";
import News from "./pages/News/News";


import useOnTabFocus from "./helpers/useOnTabFocus";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import { ModalManager } from "./helpers/ModalManager";

function App() {
  useOnTabFocus(() => {
    const user = getUser();
    const updateUser = async () => {
      if (user) {
        await axios
          .post("http://172.20.10.3:5000/getuser", {
            username: user.username,
            password: user.password,
          })
          .then((e) => {
            setUser(e.data);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    };

    updateUser();
  });

  return (
    <div className="App">
      <ModalManager>
        <Router>
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/forgotpassword" element={<ForgotPassword />} />
            <Route exact path="*" element={<NotFound />} />
            <Route exact path="/confirm/:token" element={<Confirm />} />
            <Route exact path="/reset/:token" element={<ResetPassword />} />
            <Route exact path="/socket" element={<SocketTest />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/news" element={<News />} />
          </Routes>
        </Router>
      </ModalManager>
    </div>
  );
}

export default App;
