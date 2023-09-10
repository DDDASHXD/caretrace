const { Server } = require("socket.io");

const createSocket = (port) => {
  const io = new Server(port, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
  console.log(`Socket server running on port ${port}`);

  io.on("connection", (socket) => {
    socket.emit("hello", "world");

    socket.on("howdy", (e) => {
      console.log(e);
    });

    socket.on("coords", (e) => {
      const { x, y } = e;

      if (x > 550 || x < 250 || y > 550 || y < 250) {
        console.log("Outside of geofence");
        socket.broadcast.emit("coords", { x, y, geoSafe: false });
      } else {
        console.log("inside of geofence");
        socket.broadcast.emit("coords", { x, y, geoSafe: true });
      }
    });

    socket.on("counter", (e) => {
      socket.broadcast.emit("counter", e);
      if (e > 40) {
        console.error("The patient has moved out of the geofence!");
        socket.emit(
          "geofence:boundary",
          "The patient has moved out of the geofence!"
        );
      } else {
        console.log(e);
      }
    });
  });
};

module.exports = createSocket;
