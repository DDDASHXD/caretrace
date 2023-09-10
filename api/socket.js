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

    socket.on("counter", (e) => {
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
