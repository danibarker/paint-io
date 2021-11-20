import convertCanvasToBlob from "../imageutils/canvasToBlob";
import { sendImage } from "../requests/posts";
import { getImageById } from "../requests/gets";

export function ControlPanel({ canvasRef, clearCanvas, id, setId }) {
    return (
        <div className="save-clear-get-buttons">
            <button
                onClick={() => {
                    let blob = convertCanvasToBlob(canvasRef.current);
                    console.log(blob);
                    sendImage(blob);
                }}
            >
                Save Canvas
            </button>
            <button onClick={() => clearCanvas(canvasRef.current)}>
                Clear Canvas
            </button>
            <div className="id-input-and-button">
                <input
                    placeholder="Enter ID"
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
        </div>
    );
}
