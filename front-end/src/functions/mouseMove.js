export function mouseMove(event, canvas, socket, mouseDown, brushSize, color, roomId) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    if (mouseDown) {
        let ctx = canvas.getContext("2d");
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
        socket.emit("drawing", data, roomId);
    }
}
export const clearCanvas = (canvas, socket, roomId) => {
    let ctx = canvas.getContext("2d");
    ctx.beginPath();

    ctx.fillStyle = "#fff7e0"
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fill()
    socket.emit('clear', roomId)
};
