import convertCanvasToBlob from "../imageutils/canvasToBlob";
import { sendImage } from "../requests/posts";
// import { getImageById } from "../requests/gets";
import { clearCanvas } from "../functions/mouseMove";
import { useState } from "react";

export function ControlPanel({
    canvasRef,
    id,
    setId,
    socketRef,
    roomId,
    setRoomId,
}) {
    const joinRoom = () => {
        socketRef.emit("join", "hello", roomId);
        setJoined(true);
    };
    const leaveRoom = () => {
        socketRef.emit("leave", roomId);
        setJoined(false);
    };
    const [joined, setJoined] = useState(false);
    return (
        <div className="save-clear-get-buttons">
            <button
                className="save-and-clear-buttons"
                onClick={() => {
                    let blob = convertCanvasToBlob(canvasRef.current);
                    console.log(blob);
                    sendImage(blob);
                }}
            >
                Save Canvas
            </button>
            <button
                className="save-and-clear-buttons"
                onClick={() =>
                    clearCanvas(canvasRef.current, socketRef, roomId)
                }
            >
                Clear Canvas
            </button>
            <div className="id-input-and-button">
                {joined ? (
                    <button className="room-left" disabled>
                        {roomId}
                    </button>
                ) : (
                    <input
                        className="room-left"
                        placeholder="Enter ID"
                        value={id}
                        onChange={(e) => {
                            setRoomId(e.target.value);
                        }}
                    />
                )}

                <button
                    className="room-right"
                    onClick={() => {
                        joined ? leaveRoom() : joinRoom();
                    }}
                >
                    {joined ? "Leave Room " : "Join room"}
                </button>
            </div>
        </div>
    );
}

/*
onClick={async () => {
    const image = await getImageById(id);
    let canvasImage = new Image();
    canvasImage.src = `data:image/jpeg;base64,${Buffer.from(
        image.image.data
    ).toString("base64")}`;
    let context = canvasRef.current.getContext("2d");
    context.drawImage(canvasImage, 0, 0);
}}
*/
