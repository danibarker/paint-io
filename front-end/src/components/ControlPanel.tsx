import convertCanvasToBlob from "../imageutils/canvasToBlob";
import { useAppContext } from "../provider/useAppContext";
import { sendImage } from "../requests/posts";
import { useState } from "react";

export function ControlPanel() {
    const { canvasRef, clearCanvas, roomId, setRoomId } = useAppContext();
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
    const [roomIdInput, setRoomIdInput] = useState("");
    const [savedConfirmationVisibile, setSavedConfirmationVisible] =
        useState(false);
    const [roomLeftClass, setRoomLeftClass] = useState("room-left");
    const notificationClass = savedConfirmationVisibile
        ? "notification-show"
        : "notification-hide";
    return (
        <div className="save-clear-get-buttons">
            <div className="save-button-container">
                <button
                    className="save-and-clear-buttons"
                    onClick={() => {
                        if (!canvasRef || !canvasRef.current) {
                            console.error("Canvas not found");
                            return;
                        }
                        const blob = convertCanvasToBlob(canvasRef.current);
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
                onClick={() => clearCanvas()}
            >
                Clear Canvas
            </button>
            <div className="id-input-and-button">
                {roomId ? (
                    <button className="room-left" disabled>
                        {roomId}
                    </button>
                ) : (
                    <input
                        className={roomLeftClass}
                        placeholder="Enter ID"
                        value={roomIdInput}
                        onChange={(e) => {
                            setRoomIdInput(e.target.value);
                        }}
                    />
                )}

                <button
                    className="room-right"
                    onClick={() => {
                        roomId
                            ? setRoomId("")
                            : roomIdInput
                            ? setRoomId(roomIdInput)
                            : roomLeftAlertVisible();
                    }}
                >
                    {roomId ? "Leave Room " : "Join Room"}
                </button>
            </div>
        </div>
    );
}
