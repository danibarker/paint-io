import "./App.css";
import { useRef, useState, useEffect } from "react";
import ColorSelector from "./ColorSelector";
import BrushSelector from "./BrushSelector";
import socketIOClient from "socket.io-client";
import convertCanvasToBlob from "./imageutils/canvasToBlob";
import { sendImage } from "./requests/posts";
import { getImageById } from "./requests/gets";

let socket = socketIOClient(window.location.href);
socket.on("connect", () => {
    console.log(`Connected with id: ${socket.id}`);
});

function App() {
    const [id, setId] = useState();

    const canvasRef = useRef(null);
    const [mouseDown, setMouseDown] = useState(false);
    const [color, setColor] = useState("blue");
    const [brushSize, setBrushSize] = useState(10);
    useEffect(() => {
        socket.on("drawing", (data) => {
            let canvas = canvasRef.current;
            let ctx = canvas.getContext("2d");
            ctx.beginPath();
            ctx.arc(data.x, data.y, data.brushSize, 0, 2 * Math.PI);
            ctx.fillStyle = data.color;
            ctx.fill();
        });
    }, []);
    function mouseMove(event) {
        let canvas = canvasRef.current;
        let rect = canvas.getBoundingClientRect();
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;
        // console.log("Coordinate x: " + x, "Coordinate y: " + y, mouseDown);
        if (mouseDown) {
            let ctx = canvas.getContext("2d");
            ctx.beginPath();
            ctx.arc(x, y, brushSize, 0, 2 * Math.PI);
            ctx.fillStyle = color;
            ctx.fill();
            const data = {
                x: x,
                y: y,
                color: color,
                brushSize: brushSize,
          
            };
            socket.emit("drawing", data);
        }
    }
    return (
        <div
            className="App"
            style={{
                display: "grid",
                flexDirection: "column",
                justifyContent: "center",
            }}
        >
            <div>
                <ColorSelector setColor={setColor} />
                <BrushSelector setBrushSize={setBrushSize} />
            </div>
            <input />
            <canvas
                ref={canvasRef}
                width="600"
                height="400"
                style={{ border: "1px solid red" }}
                onMouseMove={(e) => {
                    mouseMove(e);
                }}
                onMouseDown={() => setMouseDown(true)}
                onMouseUp={() => setMouseDown(false)}
            ></canvas>
            <button
                onClick={() => {
                    let blob = convertCanvasToBlob(canvasRef.current);
                    console.log(blob);
                    sendImage(blob);
                }}
            >
                Save Canvas
            </button>
            <input
                value={id}
                onChange={(e) => {
                    setId(e.target.value);
                }}
            />
            <button
                onClick={async () => {
                    const image = await getImageById(id);
                    let canvasImage = new Image();
                    canvasImage.src = `data:image/jpeg;base64,${Buffer.from(
                        image.image.data
                    ).toString("base64")}`;
                    let context = canvasRef.current.getContext("2d");
                    context.drawImage(canvasImage, 0, 0);
                }}
            >
                Get Image By Id
            </button>
        </div>
    );
}

export default App;
