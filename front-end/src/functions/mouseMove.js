export function mouseMove(event, canvas, socket, mouseDown, brushSize, color) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    // console.log("Coordinate x: " + x, "Coordinate y: " + y, mouseDown);
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
        socket.emit("drawing", data);
    }
}
export const clearCanvas = (canvas) => {
    console.log("clearing canvas");
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
};