import React from "react";
import "./Dashboard.scss";
import { clearUser, getUser } from "../../helpers/localstorage";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = React.useState({});
  const navigate = useNavigate();

  React.useEffect(() => {
    const localUser = getUser();

    if (localUser) {
      setUser(localUser);
    } else {
      navigate("/login");
    }
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
        </>
      )}
    </div>
  );
};

export default Dashboard;
