import ColorSelector from "./ColorSelector";
import BrushSelector from "./BrushSelector";
import { mouseMove } from "../functions/mouseMove";
import { useState } from "react";
import { Socket } from "socket.io-client";
type CanvasProps = {
    canvasRef: React.RefObject<HTMLCanvasElement>;
    socketRef: Socket | null;
    mouseDown: boolean;
    setMouseDown: (down: boolean) => void;
    roomId: string;
};
export function Canvas(props: CanvasProps) {
    const { canvasRef, socketRef, mouseDown, setMouseDown, roomId } = props;
    const [color, setColor] = useState("black");
    const [brushSize, setBrushSize] = useState(15);

    return (
        <div className="canvas-container">
            <div className="color-and-brush-selector">
                <ColorSelector setColor={setColor} />
                <BrushSelector
                    brushSize={brushSize}
                    setBrushSize={setBrushSize}
                    setColor={setColor}
                    color={color}
                />
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
                        color,
                        roomId
                    );
                }}
                onMouseDown={() => setMouseDown(true)}
                onMouseUp={() => setMouseDown(false)}
            ></canvas>
        </div>
    );
}
