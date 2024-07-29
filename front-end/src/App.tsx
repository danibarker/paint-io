import "./css/App.css";
import { useRef, useState, useEffect } from "react";
import socketIOClient, { Socket } from "socket.io-client";
import { ControlPanel } from "./components/ControlPanel";
import { Header } from "./components/Header";
import { Canvas } from "./components/Canvas";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Gallery from "./components/Gallery";
function App() {
    const canvasRef: React.MutableRefObject<HTMLCanvasElement | null> =
        useRef(null);
    const [mouseDown, setMouseDown] = useState(false);
    const [socketRef, setSocketRef] = useState<Socket | null>(null);
    const [roomId, setRoomId] = useState<string>("");

    useEffect(() => {
        const socket = socketIOClient(window.location.href);
        window.onclose = () => {
            prompt("Are you sure you want to leave?");
            socket.emit("leave", roomId);
        };
        socket.on("connect", () => {
            console.log(`Connected with id: ${socket.id}`);
        });
        socket.on("drawing", (data) => {
            if (!canvasRef.current) return;
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;
            ctx.beginPath();
            ctx.arc(data.x, data.y, data.brushSize, 0, 2 * Math.PI);
            ctx.fillStyle = data.color;
            ctx.fill();
        });
        socket.on("clear", () => {
            const canvas = canvasRef.current;
            const ctx = canvas?.getContext("2d");
            ctx?.beginPath();
            ctx && (ctx.fillStyle = "#fff7e0");
            canvas && ctx?.rect(0, 0, canvas.width, canvas.height);
            ctx?.fill();
        });
        socket.on("usersOnline", (usersOnline) => {
            console.log(usersOnline);
        });
        setSocketRef(socket);
        return () => {
            socket.disconnect();
        };
    }, [roomId]);

    return (
        <div className="app">
            <Router>
                <Header />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <div className="canvas-and-control-panel">
                                <Canvas
                                    canvasRef={canvasRef}
                                    socketRef={socketRef}
                                    mouseDown={mouseDown}
                                    setMouseDown={setMouseDown}
                                    roomId={roomId}
                                />
                                <ControlPanel
                                    canvasRef={canvasRef}
                                    socketRef={socketRef}
                                    roomId={roomId}
                                    setRoomId={setRoomId}
                                />
                                <a
                                    className="instruction-link"
                                    href="https://danibarker.github.io/paintIO"
                                    target="_"
                                >
                                    About / Instructions
                                </a>
                            </div>
                        }
                    />
                    <Route path="/gallery" element={<Gallery />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
