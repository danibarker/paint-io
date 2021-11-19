const express = require('express')
const app = express()
const http = require('http')
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

socket.on("disconnect", () => {
        socket.leave(roomId);
    });
})

app.use(express.static('front-end/build'))

server.listen(port, () => {
    console.log(`Listening on port ${port}`)})
