import "./css/App.css";
import { ControlPanel } from "./components/ControlPanel";
import { Header } from "./components/Header";
import { Canvas } from "./components/Canvas";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Gallery from "./components/Gallery";
import ContextProvider from "./provider";
function App() {
    return (
        <ContextProvider>
            <div className="app">
                <Router>
                    <Header />
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <div className="canvas-and-control-panel">
                                    <Canvas />
                                    <ControlPanel />
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
        </ContextProvider>
    );
}

export default App;
