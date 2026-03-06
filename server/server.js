const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const http = require("http");
const { Server } = require("socket.io");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/rooms", require("./routes/roomRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));

const PORT = 5005;
app.get("/", (req, res) => {
  res.send("StudyWithStranger Backend Running 🚀");
});
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});
const users = {};

io.on("connection", (socket) => {

  socket.on("join-room", ({ roomId, userId }) => {

    socket.join(roomId);

    if (!users[roomId]) {
      users[roomId] = [];
    }

    users[roomId].push({
      socketId: socket.id,
      userId
    });

    socket.emit("all-users", users[roomId]);

    socket.to(roomId).emit("user-joined", {
      socketId: socket.id,
      userId
    });

  });

  socket.on("disconnect", () => {

    for (const room in users) {
      users[room] = users[room].filter(
        user => user.socketId !== socket.id
      );
    }

  });

});

server.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});