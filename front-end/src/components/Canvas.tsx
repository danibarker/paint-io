import ColorSelector from "./ColorSelector";
import BrushSelector from "./BrushSelector";
import { useAppContext } from "../provider/useAppContext";
export function Canvas() {
    const { canvasRef, setMouseDown, mouseMove } = useAppContext();

    return (
        <div className="canvas-container">
            <div className="color-and-brush-selector">
                <ColorSelector />
                <BrushSelector />
            </div>
            <canvas
                ref={canvasRef}
                width="600"
                height="600"
                onMouseMove={mouseMove}
                onMouseDown={() => setMouseDown(true)}
                onMouseUp={() => setMouseDown(false)}
            ></canvas>
        </div>
    );
}
