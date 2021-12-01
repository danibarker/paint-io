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
        setRoomId();
    };
    const displaySavedConfirmation = () => {
        setSavedConfirmationVisible(true);
        setTimeout(() => {
            setSavedConfirmationVisible(false);
        }, 1500);
    };
    const roomLeftAlertVisible = () => {
        setRoomLeftClass("room-left room-left-alert");
        setTimeout(() => {
            setRoomLeftClass("room-left");
        }, 500);
    };
    const [joined, setJoined] = useState(false);
    const [savedConfirmationVisibile, setSavedConfirmationVisible] =
        useState(false);
    const [roomLeftClass, setRoomLeftClass] = useState("room-left");
    let notificationClass = savedConfirmationVisibile
        ? "notification-show"
        : "notification-hide";
    return (
        <div className="save-clear-get-buttons">
            <div className="save-button-container">
                <button
                    className="save-and-clear-buttons"
                    onClick={() => {
                        let blob = convertCanvasToBlob(canvasRef.current);
                        sendImage(blob);
                        displaySavedConfirmation();
                    }}
                >
                    Save Canvas
                </button>
                <div className={notificationClass}>
                    <p>Saved &#10003;</p>
                </div>
            </div>
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
                        className={roomLeftClass}
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
                        joined
                            ? leaveRoom()
                            : roomId
                            ? joinRoom()
                            : roomLeftAlertVisible();
                    }}
                >
                    {joined ? "Leave Room " : "Join Room"}
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
