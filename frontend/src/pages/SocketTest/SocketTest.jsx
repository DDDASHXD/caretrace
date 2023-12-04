import React from "react";
import { io } from "socket.io-client";
import axios from "axios";

import "./SocketTest.scss";

const SocketTest = () => {
  const [counter, setCounter] = React.useState(0);
  const [coords, setCoords] = React.useState({ x: 0, y: 0 });
  const [socket, setSocket] = React.useState(null);
  const hoverZone = React.useRef(null);
  const [battery, setBattery] = React.useState(100);

  const [members, setMembers] = React.useState([]);
  const [member, setMember] = React.useState(null);

  const getMembers = async () => {
    await axios
      .get("http://localhost:5000/getAllMembers")
      .then((e) => {
        setMembers(e.data);
      })
      .catch((e) => {
        console.error(e.data);
      });
  };

  const saveBattery = () => {
    socket.emit("battery", { member: member, battery: battery });
  };

  // Socket handling
  React.useEffect(() => {
    getMembers();
    const newSocket = io("ws://localhost:5050");
    setSocket(newSocket);

    let lastEmitTime = Date.now();
    const throttleDuration = 500; // 1/2 second

    const handleMouseMove = (e) => {
      const currentTime = Date.now();
      if (currentTime - lastEmitTime > throttleDuration) {
        lastEmitTime = currentTime;

        const x = e.clientX;
        const y = e.clientY;
        setCoords({ x: e.clientX, y: e.clientY });
        newSocket.emit("coords", { member: member, x, y });
      }
    };

    if (hoverZone.current) {
      hoverZone.current.addEventListener("mousemove", handleMouseMove);
    }

    newSocket.on("geofence:boundary", (e) => {
      console.error(e);
    });

    return () => {
      newSocket.removeAllListeners();

      if (hoverZone.current) {
        hoverZone.current.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [coords]);

  return (
    <div>
      Select citizen:
      <select onChange={(e) => setMember(e.target.value)}>
        {members.map((member) => (
          <option value={member._id}>
            {member.name} {member.surname}
          </option>
        ))}
      </select>
      <p>{member}</p>
      <div className="gpssim" ref={hoverZone}>
        <h1 style={{ fontSize: "3rem" }}>Udenfor plejehjem</h1>
      </div>
      <input
        type="number"
        onChange={(e) => setBattery(e.target.value)}
        value={battery}
      />
      <button className="save" onClick={() => saveBattery()}>
        Save battery to user
      </button>
      <p>
        x: {coords.x} | y: {coords.y}
      </p>
    </div>
  );
};

export default SocketTest;
