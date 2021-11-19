const express = require('express')
const app = express()
const http = require('http')
const imageRouter = require("./routes/images");

const server = http.createServer(app)
const port = process.env.PORT || 5000
const options = {
    cors: {
        origin: '*',
    }
};
const io = require('socket.io')(server, options);

io.on("connection", (socket) => {
    console.log("IT WORKED!!! socket.id: ", socket.id)
    const { roomId, username } = socket.handshake.query;
    socket.join(roomId);

    // Data??
    socket.on("drawing", (data) => {
        console.log("Drawing...")
        socket.broadcast.emit('drawing', data)
    })

    socket.on("disconnect", () => {
        socket.leave(roomId);
    });
})
app.use(express.json());

app.use(express.static('front-end/build'))
app.use("/api/images", imageRouter);

server.listen(port, () => {
    console.log(`Listening on port ${port}`)})
