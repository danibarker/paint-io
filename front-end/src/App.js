import "./App.css";
import { useRef, useState } from "react";
import ColorSelector from "./ColorSelector";
import BrushSelector from "./BrushSelector";
import { sendImage } from "./requests/posts";
import { getImageById } from "./requests/gets";
import convertCanvasToBlob from "./imageutils/canvasToBlob";

function App() {
    const canvasRef = useRef(null);
    const [mouseDown, setMouseDown] = useState(false);
    const [color, setColor] = useState("blue");
    const [brushSize, setBrushSize] = useState(10);
    const [id, setId] = useState();
    function getMousePosition(event) {
        let canvas = canvasRef.current;
        let rect = canvas.getBoundingClientRect();
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;
        if (mouseDown) {
            let ctx = canvas.getContext("2d");
            ctx.beginPath();
            ctx.arc(x, y, brushSize, 0, 2 * Math.PI);
            ctx.fillStyle = color;
            ctx.fill();
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
            <canvas
                ref={canvasRef}
                width="600"
                height="400"
                style={{ border: "1px solid red" }}
                onMouseMove={(e) => getMousePosition(e)}
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
