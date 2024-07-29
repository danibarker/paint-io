import { Socket } from "socket.io-client";

export function mouseMove(
    event: React.MouseEvent<HTMLCanvasElement>,
    canvas: HTMLCanvasElement | null,
    socket: Socket | null,
    mouseDown: boolean,
    brushSize: number,
    color: string,
    roomId: string
) {
    if (!canvas) {
        console.error("Canvas not found");
        return;
    }
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    if (mouseDown) {
        const ctx = canvas.getContext("2d");
        if (!ctx) {
            console.error("Context not found");
            return;
        }
        ctx.beginPath();
        ctx.arc(x, y, brushSize, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
        const data = {
            x: x,
            y: y,
            color: color,
            brushSize: brushSize,
        };
        if (socket) {
            socket.emit("drawing", data, roomId);
        } else {
            console.error("Socket not connected");
        }
    }
}
export const clearCanvas = (
    canvas: HTMLCanvasElement | null,
    socket: Socket | null,
    roomId: string
) => {
    if (!canvas) {
        console.error("Canvas not found");
        return;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) {
        console.error("Context not found");
        return;
    }
    ctx.beginPath();

    ctx.fillStyle = "#fff7e0";
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fill();
    if (!socket) {
        console.error("Socket not connected");
        return;
    }
    socket.emit("clear", roomId);
};
