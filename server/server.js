// Import express framework
const express = require("express");

// Import Node's built-in HTTP module
// Socket.IO works with HTTP server
const http = require("http");

// Import Socket.IO server
const { Server } = require("socket.io");

// Import CORS middleware
const cors = require("cors");

// Create express app
const app = express();

// Enable CORS so frontend can connect
app.use(cors());

// Create HTTP server using express app
const server = http.createServer(app);

// Create Socket.IO server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Listen for socket connections
io.on("connection", (socket) => {

  console.log("A user connected:", socket.id);

  // Listen for custom message event
  socket.on("message", (data) => {

    console.log("Message received:", data);

    // Send message to all users
    io.emit("message", data);
  });

  // Listen for drawing data
  socket.on("draw", (data) => {

    // Send drawing data to everyone except sender
    socket.broadcast.emit("draw", data);
  });

  // Listen when drawing starts
socket.on("startDrawing", () => {

  // Notify all other users
  socket.broadcast.emit("startDrawing");
});

// Listen when drawing stops
socket.on("stopDrawing", () => {

  // Notify all other users
  socket.broadcast.emit("stopDrawing");
});


  // Detect user disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });

});
// Basic route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Start server
server.listen(3000, () => {
  console.log("Server running on port 3000");
});