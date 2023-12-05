import React from "react";
import axios from "axios";
import "./Dashboard.scss";
import { clearUser, getUser } from "../../helpers/localstorage";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

import Input from "../../components/Input/Input";

import logo from "../../assets/branding/logo.png";

// Subpages
import DashHome from "./subpages/DashHome";
import { LayoutDashboard, Logout } from "tabler-icons-react";

import DashMembers from "./subpages/DashMembers";
import { Users } from "tabler-icons-react";

import DashSocket from "./subpages/DashSocket";
import { Database } from "tabler-icons-react";

import DashUsers from "./subpages/DashUsers";

import { useModal } from "../../helpers/ModalManager";

const Dashboard = () => {
  const [user, setUser] = React.useState({});
  const navigate = useNavigate();
  const [counter, setCounter] = React.useState(0);
  const [coords, setCoords] = React.useState({ x: 0, y: 0 });
  const [geoSafe, setGeoSafe] = React.useState(true);
  const [members, setMembers] = React.useState([]);

  const [memberName, setMemberName] = React.useState("");
  const [memberSurname, setMemberSurname] = React.useState("");

  const [activePage, setActivePage] = React.useState(0);

  const { create, close } = useModal();

  const pages = [
    {
      name: "Home",
      component: <DashHome user={user} />,
      icon: <LayoutDashboard />,
    },
    {
      name: "Citizens",
      component: <DashMembers user={user} />,
      icon: <Users />,
    },
    {
      name: "Socket test",
      component: <DashSocket user={user} />,
      icon: <Database />,
    },
    {
      name: "Users",
      admin: true,
      component: <DashUsers user={user} />,
      icon: <Users />,
    },
  ];

  React.useEffect(() => {
    const localUser = getUser();

    if (localUser) {
      setUser(localUser);
    } else {
      navigate("/login");
    }
  }, []);

  const confirmSignout = () => {
    const id = Date.now();
    create({
      id,
      title: "Sign out",
      body: <p>Are you sure you want to sign out?</p>,
      close: "Cancel",
      onClose: () => close(id),
      confirm: "Sign out",
      onConfirm: () => {
        handleSignOut();
        close(id);
      },
      confirmColor: "var(--danger)",
    });
  };

  const getMembers = async () => {
    console.log("user.email", user.name);
    await axios
      .get(`http://172.20.10.3:5000/getMembers?owner=${user.email}`)
      .then((e) => {
        setMembers(e.data);
        console.log(e.data);
      })
      .catch((e) => {
        console.error(e.data);
      });
  };

  React.useEffect(() => {
    if (user) {
      getMembers();
    }
  }, [user]);

  React.useEffect(() => {
    const socket = io("ws://172.20.10.3:5050");

    socket.on("counter", (e) => {
      setCounter(e);
    });

    socket.on("coords", (e) => {
      setCoords({ x: e.x, y: e.y });
      if (e.geoSafe) {
        setGeoSafe(true);
      } else {
        setGeoSafe(false);
      }
    });

    return () => {
      socket.removeAllListeners();
    };
  }, []);

  const addMember = async () => {
    await axios
      .post("http://172.20.10.3:5000/addMember", {
        owner: user.email,
        name: memberName,
        surname: memberSurname,
      })
      .then((e) => {
        console.log(e.data.msg);
        setMembers([...members, e.data.member]);
      })
      .catch((e) => {
        console.error(e.data);
      });
  };

  const handleSignOut = () => {
    clearUser();
    navigate("/");
  };

  const indicator = React.useRef(null);
  const activePageRef = React.useRef(null);

  React.useEffect(() => {
    if (indicator.current && activePageRef.current) {
      setTimeout(() => {
        const indicatorBounds = indicator.current.getBoundingClientRect();
        const activePageBounds = activePageRef.current.getBoundingClientRect();

        indicator.current.style.top = `${activePageBounds.top - 30}px`;
        indicator.current.style.height = `${activePageBounds.height}px`;
        indicator.current.style.width = `${activePageBounds.width}px`;
        indicator.current.style.left = `${activePageBounds.left - 30}px`;
      }, 1);
    }
  }, [activePageRef.current]);

  return (
    <div className="Dashboard">
      {user && (
        <>
          {/* <h1>Dashboard</h1>
          <h3>Welcome, {user.name}</h3>
          <p>
            Your account is {user.isVerified ? "verified." : "not verified."}
          </p>
          <button className="signOut" onClick={() => handleSignOut()}>
            Sign out
          </button>
          <p>Counter: {counter}</p>
          <h3 style={{ color: geoSafe ? "green" : "red" }}>
            {geoSafe ? "Inside of GeoFence" : "Outside of GeoFence"}
          </h3>
          <p style={{ color: geoSafe ? "green" : "red" }}>
            x: {coords.x} | y: {coords.y}
          </p>
          <button onClick={() => console.log(user)}>Debug</button>
          <Input
            placeholder="New Member Name"
            onChange={(e) => setMemberName(e.target.value)}
          />
          <Input
            placeholder="New Member Surame"
            onChange={(e) => setMemberSurname(e.target.value)}
          />
          <button onClick={() => addMember()}>Add user</button>
          <h2>Members</h2>
          <button onClick={() => getMembers()}>Get members</button>
          {members.length > 0 ? (
            <ul>
              {members.map((member) => (
                <li key={member.name}>
                  {member.name} | {member.surname}
                </li>
              ))}
            </ul>
          ) : (
            <p>No members</p>
          )}*/}
          <div className="sidePanel">
            <div className="top">
              <img
                src={logo}
                alt=""
                onClick={() => window.open("/", "_self")}
              />
              <div className="pages">
                <div className="indicator" ref={indicator}></div>
                {pages.map((page, index) => (
                  <>
                    {page.admin && !user.admin ? null : (
                      <div
                        className={`page ${
                          activePage == index ? "active" : ""
                        }`}
                        key={page.name}
                        onClick={() => setActivePage(index)}
                        ref={activePage == index ? activePageRef : null}
                      >
                        {page.icon}
                        <p>{page.name}</p>
                      </div>
                    )}
                  </>
                ))}
              </div>
            </div>

            <div className="account">
              <h3 className="name">{user.name}</h3>
              <p className="email">{user.email}</p>
              <button onClick={() => confirmSignout()}>
                <Logout />
                Sign out
              </button>
            </div>
          </div>
          <div className="mainPanel">{pages[activePage].component}</div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
