import "./css/App.css";
import { useRef, useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import { ControlPanel } from "./components/ControlPanel";
import { Header } from "./components/Header";
import { Canvas } from "./components/Canvas";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Gallery from "./components/Gallery";
function App() {
    const [id, setId] = useState();
    const canvasRef = useRef(null);
    const [mouseDown, setMouseDown] = useState(false);
    const [socketRef, setSocketRef] = useState();
    const [roomId, setRoomId] = useState();

    useEffect(() => {
        let socket = socketIOClient(window.location.href);
        window.onclose = () => {
            prompt("Are you sure you want to leave?");
            socket.emit("leave", roomId);
        };
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
            let canvas = canvasRef.current;
            let ctx = canvas.getContext("2d");
            ctx.beginPath();
            ctx.fillStyle = "#fff7e0";
            ctx.rect(0, 0, canvas.width, canvas.height);
            ctx.fill();
        });
        socket.on("usersOnline", (usersOnline) => {
            console.log(usersOnline);
        });
        setSocketRef(socket);
        return () => {
            socket.disconnect();
        };
    }, []);

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
                                    id={id}
                                    setId={setId}
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
