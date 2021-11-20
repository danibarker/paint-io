import "./App.css";
import { useRef, useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import { ControlPanel } from "./components/ControlPanel";
import { Header } from "./components/Header";
import { Canvas } from "./components/Canvas";

function App() {
    const [id, setId] = useState();
    const canvasRef = useRef(null);
    const [mouseDown, setMouseDown] = useState(false);
    const [socketRef, setSocketRef] = useState();
    useEffect(() => {
        let socket = socketIOClient(window.location.href);
        socket.on("connect", () => {
            console.log(`Connected with id: ${socket.id}`);
        });
        socket.on("drawing", (data) => {
            let canvas = canvasRef.current;
            let ctx = canvas.getContext("2d");
            ctx.beginPath();
            ctx.arc(data.x, data.y, data.brushSize, 0, 2 * Math.PI);
            ctx.fillStyle = data.color;
            ctx.fill();
        });
        socket.on("clear", () => {
            let canvas = canvasRef.current
            let ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        });
        setSocketRef(socket);
    }, []);

    return (
        <div className="app">
            <Header />
            <Canvas
                canvasRef={canvasRef}
                socketRef={socketRef}
                mouseDown={mouseDown}
                setMouseDown={setMouseDown}
            />
            <ControlPanel
                canvasRef={canvasRef}
                socketRef={socketRef}
                id={id}
                setId={setId}
            />
        </div>
    );
}

export default App;
