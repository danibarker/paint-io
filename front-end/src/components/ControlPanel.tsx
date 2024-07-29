import convertCanvasToBlob from "../imageutils/canvasToBlob";
import { sendImage } from "../requests/posts";
import { clearCanvas } from "../functions/mouseMove";
import { useState } from "react";
import { Socket } from "socket.io-client";

type ControlPanelProps = {
    canvasRef: React.RefObject<HTMLCanvasElement>;
    socketRef: Socket | null;
    roomId: string;
    setRoomId: (roomId: string) => void;
};

export function ControlPanel({
    canvasRef,
    socketRef,
    roomId,
    setRoomId,
}: ControlPanelProps) {
    const joinRoom = () => {
        if (!socketRef) {
            console.error("Socket not connected");
            return;
        }
        socketRef.emit("join", "hello", roomId);
        setJoined(true);
    };
    const leaveRoom = () => {
        if (!socketRef) {
            console.error("Socket not connected");
            return;
        }
        socketRef.emit("leave", roomId);
        setJoined(false);
        setRoomId("");
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
    const notificationClass = savedConfirmationVisibile
        ? "notification-show"
        : "notification-hide";
    return (
        <div className="save-clear-get-buttons">
            <div className="save-button-container">
                <button
                    className="save-and-clear-buttons"
                    onClick={() => {
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
                        value={roomId}
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
