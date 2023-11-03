import React from "react";
import { io } from "socket.io-client";

const DashSocket = () => {
  const [coords, setCoords] = React.useState({ x: 0, y: 0 });
  const [geoSafe, setGeoSafe] = React.useState(true);

  React.useEffect(() => {
    const socket = io("ws://localhost:5050");
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

  return (
    <div className="DashSocket">
      <h1>Socket test</h1>
      <p style={{ color: geoSafe ? "var(--brand)" : "var(--danger)" }}>
        Coords: {coords.x}, {coords.y}
      </p>
      <p>GeoSafe: {geoSafe ? "Safe" : "Not safe"}</p>
      <a
        href="#"
        onClick={() => window.open("http://localhost:3000/socket", "_blank")}
      >
        Click to open test
      </a>
    </div>
  );
};

export default DashSocket;
