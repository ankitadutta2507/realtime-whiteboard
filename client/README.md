Real-Time Collaborative Whiteboard

A real-time collaborative whiteboard built using React, Node.js, Express, Socket.IO, and HTML5 Canvas. This project allows multiple users to draw simultaneously on a shared whiteboard with live synchronization using WebSocket communication.

The main goal of this project was to understand and implement real-time client-server communication and multiuser synchronization in a full-stack web application.

Features
Real-time collaborative drawing
Multiuser support
Live synchronization between connected users
Canvas-based freehand drawing
WebSocket communication using Socket.IO
Frontend built with React and Vite
Backend built with Node.js and Express
Responsive and interactive user interface
Technologies Used
Frontend
React
Vite
JavaScript
HTML5 Canvas
CSS
Backend
Node.js
Express.js
Socket.IO

How It Works

Whenever a user draws on the canvas, the frontend captures the mouse coordinates and sends them to the backend using Socket.IO events. The backend receives the drawing data and broadcasts it to all other connected users in real time. Each connected client then renders the received coordinates on their own canvas, creating a synchronized collaborative drawing experience.

This project demonstrates:

WebSocket communication
Event-driven architecture
Real-time synchronization
Client-server interaction
React Hooks usage
Canvas API implementation
Project Structure
client/
  src/
    App.jsx
    socket.js

server/
  server.js
Installation and Setup
Clone Repository
git clone <repository-url>
Frontend Setup
cd client
npm install
npm run dev
Backend Setup

Open another terminal:

cd server
npm install
node server.js

Frontend runs on:

http://localhost:5173

Backend runs on:

http://localhost:3000
Learning Outcomes

Through this project, I learned:

How WebSockets work
Difference between HTTP and WebSocket communication
Real-time event handling using Socket.IO
React Hooks like useEffect, useRef, and useState
Canvas drawing implementation
Multiuser synchronization logic
Full-stack project architecture
Future Improvements
Clear board functionality
Color picker
Brush size adjustment
Room-based collaboration
User count display
Better drawing optimization
Deployment for live usage
Conclusion

This project helped me gain hands-on experience with real-time application development and full-stack integration. It was a great learning experience in building collaborative systems and understanding how live synchronization works in modern web applications.


Company Name: Codtech IT Solutions Private Limited
Name: Ankita Dutta
Intern Id: CTIS9009
Domain: Mern Stack Web Development
Duration: 4 Weeks
Mentor: Neela Santhosh Kumar
