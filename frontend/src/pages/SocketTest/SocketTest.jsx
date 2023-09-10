import React from "react";
import { io } from "socket.io-client";

import "./SocketTest.scss";

const SocketTest = () => {
  const [counter, setCounter] = React.useState(0);
  const [coords, setCoords] = React.useState({ x: 0, y: 0 });
  const [socket, setSocket] = React.useState(null);
  const hoverZone = React.useRef(null);

  // Socket handling
  React.useEffect(() => {
    const newSocket = io("ws://localhost:5050");
    setSocket(newSocket);

    let lastEmitTime = Date.now();
    const throttleDuration = 1000; // 1 second

    const handleMouseMove = (e) => {
      const currentTime = Date.now();
      if (currentTime - lastEmitTime > throttleDuration) {
        lastEmitTime = currentTime;

        const x = e.clientX;
        const y = e.clientY;
        setCoords({ x: e.clientX, y: e.clientY });
        newSocket.emit("coords", { x, y });
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
      <div className="gpssim" ref={hoverZone}></div>
      <button
        style={{ fontSize: 60, padding: "0 50px" }}
        onClick={() => setCounter(counter + 1)}
      >
        +
      </button>
      <p>
        x: {coords.x} | y: {coords.y}
      </p>
    </div>
  );
};

export default SocketTest;
