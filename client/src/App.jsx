
import { useEffect, useRef, useState } from "react";
import socket from "./socket";

function App() {

  // Reference to canvas element
  const canvasRef = useRef(null);

  // Track whether mouse is pressed
  const [isDrawing, setIsDrawing] = useState(false);

  // Store canvas context
  const contextRef = useRef(null);

  useEffect(() => {

    // Access canvas element
    const canvas = canvasRef.current;

    // Get 2D drawing context
    const context = canvas.getContext("2d");

    // Canvas styling
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 5;

    // Save context
    contextRef.current = context;

    // Listen for drawing data from backend
    socket.on("draw", (data) => {

      // Draw received coordinates
      contextRef.current.lineTo(data.x, data.y);

      contextRef.current.stroke();

      // When another user starts drawing
      socket.on("startDrawing", () => {

        // Start a new path
        contextRef.current.beginPath();
      });

      // When another user stops drawing
      socket.on("stopDrawing", () => {

        // Close drawing path
        contextRef.current.closePath();
      });
    });

    // Cleanup function
    return () => {

      // Remove socket listener
      socket.off("draw");
      socket.off("startDrawing");
      socket.off("stopDrawing");
    };

  }, []);

  // Start drawing
  const startDrawing = (event) => {

    const { offsetX, offsetY } = event.nativeEvent;

    contextRef.current.beginPath();

    contextRef.current.moveTo(offsetX, offsetY);

    setIsDrawing(true);

    // Notify other users that drawing started
    socket.emit("startDrawing");
  };

  // Stop drawing
  const stopDrawing = () => {

    contextRef.current.closePath();

    setIsDrawing(false);

    // Notify other users that drawing stopped
    socket.emit("stopDrawing");
  };

  // Draw while mouse moves
  const draw = (event) => {

    // Prevent drawing if mouse not pressed
    if (!isDrawing) return;

    const { offsetX, offsetY } = event.nativeEvent; // Get mouse coordinates

    contextRef.current.lineTo(offsetX, offsetY); // Draw line to new coordinates

    contextRef.current.stroke(); // Render the line

    // Send drawing coordinates to backend
    //drawing payload
    socket.emit("draw", {
      x: offsetX,
      y: offsetY,
      isDrawing: true,
    });
  };

  return (
    <div>

      <h1 style={{ color: "white" , }}>Realtime Whiteboard</h1>

      <canvas
        ref={canvasRef}
        width={800}
        height={500}

        style={{
          border: "2px solid black",
          backgroundColor: "white",
        }}

        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseMove={draw}
      />

    </div>
  );
}

export default App;