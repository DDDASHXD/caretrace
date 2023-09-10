import React from "react";
import "./Dashboard.scss";
import { clearUser, getUser } from "../../helpers/localstorage";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const Dashboard = () => {
  const [user, setUser] = React.useState({});
  const navigate = useNavigate();
  const [counter, setCounter] = React.useState(0);

  React.useEffect(() => {
    const localUser = getUser();

    if (localUser) {
      setUser(localUser);
    } else {
      navigate("/login");
    }
  }, []);

  React.useEffect(() => {
    const socket = io("ws://localhost:5050");

    socket.on("counter", (e) => {
      setCounter(e);
    });

    return () => {
      socket.removeAllListeners();
    };
  }, []);

  const handleSignOut = () => {
    clearUser();
    navigate("/");
  };
  return (
    <div className="Dashboard">
      {user && (
        <>
          <h1>Dashboard</h1>
          <h3>Welcome, {user.name}</h3>
          <p>
            Your account is {user.isVerified ? "verified." : "not verified."}
          </p>
          <button className="signOut" onClick={() => handleSignOut()}>
            Sign out
          </button>
          <p>Counter: {counter}</p>
        </>
      )}
    </div>
  );
};

export default Dashboard;
