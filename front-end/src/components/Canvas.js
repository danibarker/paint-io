import ColorSelector from "./ColorSelector";
import BrushSelector from "./BrushSelector";
import { mouseMove } from "../functions/mouseMove";
import { useState } from "react";
export function Canvas(props) {
    const { canvasRef, socketRef, mouseDown, setMouseDown } = props;
    const [color, setColor] = useState("black");
    const [brushSize, setBrushSize] = useState(1);

    return (
        <div className="canvas-container">
            <div className="color-and-brush-selector">
                <ColorSelector setColor={setColor} />
                <BrushSelector setBrushSize={setBrushSize} />
            </div>
            <canvas
                ref={canvasRef}
                width="600"
                height="600"
                onMouseMove={(e) => {
                    mouseMove(
                        e,
                        canvasRef.current,
                        socketRef,
                        mouseDown,
                        brushSize,
                        color
                    );
                }}
                onMouseDown={() => setMouseDown(true)}
                onMouseUp={() => setMouseDown(false)}
            ></canvas>
        </div>
    );
}
