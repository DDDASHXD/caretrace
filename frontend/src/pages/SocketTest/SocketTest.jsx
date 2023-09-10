import React from "react";
import { io } from "socket.io-client";

const SocketTest = () => {
  const [counter, setCounter] = React.useState(0);
  React.useEffect(() => {
    const socket = io("ws://localhost:5050");

    socket.emit("counter", counter);

    socket.on("geofence:boundary", (e) => {
      console.error(e);
    });

    return () => {
      socket.removeAllListeners();
    };
  }, [counter]);
  return (
    <div>
      <button
        style={{ fontSize: 60, padding: "0 50px" }}
        onClick={() => setCounter(counter + 1)}
      >
        +
      </button>
    </div>
  );
};

export default SocketTest;
