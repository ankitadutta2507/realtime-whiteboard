// Import socket.io-client package
import { io } from "socket.io-client";

// Connect frontend to backend server
// Backend is running on port 3000
const socket = io("http://localhost:3000");

// Export socket so other files can use it
export default socket;