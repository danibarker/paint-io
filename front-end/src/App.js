import logo from "./logo.svg";
import "./App.css";
import { useRef, useState } from "react";
import ColorSelector from "./ColorSelector";
import BrushSelector from "./BrushSelector";
import socketIOClient from "socket.io-client"

// *** Change to process.env.PORT || 5000? - where socket is running
let socket = socketIOClient(`http://localhost:5000`)
socket.on("connect", () => {
  console.log(`Connected with id: ${socket.id}`)
})

function App(data) {
  const canvasRef = useRef(null);
  const [mouseDown, setMouseDown] = useState(false);
  const [color, setColor] = useState("blue");
  const [brush, setBrush] = useState(10);
  
  function getMousePosition(event) {
    let canvas = canvasRef.current;
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    // console.log("Coordinate x: " + x, "Coordinate y: " + y, mouseDown);
    if (mouseDown) {
      let ctx = canvas.getContext("2d");
      ctx.beginPath();
      ctx.arc(x, y, brush, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();
      socket.emit('drawing', data)
    }
  }
  return (
    <div className="App" style={{display:"grid", flexDirection:"column", justifyContent:"center"}}>
      <div>
        <ColorSelector setColor={setColor} />
        <BrushSelector setBrush={setBrush} />
      </div>
      <canvas
        ref={canvasRef}
        width="600"
        height="400"
        style={{ border: "1px solid red" }}
        onMouseMove={(e) => getMousePosition(e)}
        onMouseDown={(e) => setMouseDown(true)}
        onMouseUp={(e) => setMouseDown(false)}
      ></canvas>
    </div>
  );
}

export default App;
