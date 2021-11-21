const express = require("express");
const app = express();
const http = require("http");
const imageRouter = require("./routes/images");
const path = require("path");
require("dotenv").config();
const server = http.createServer(app);
const port = process.env.PORT;
const options = {
    cors: {
        origin: "*",
    },
};
const io = require("socket.io")(server, options);

io.on("connection", (socket) => {
    console.log("IT WORKED!!! socket.id: ", socket.id);
    socket.on("join", (data, roomId) => {
        console.log("data is", data, "room is", roomId);
        socket.join(roomId);
        socket.to(roomId).emit("join", data);
    });
    socket.on("drawing", (data, roomId) => {
        console.log(data);
        socket.to(roomId).emit("drawing", data);
    });
    socket.on("clear", (roomId) => {
        socket.to(roomId).emit("clear");
    });
    socket.on("leave", (roomId) => {
        socket.leave(roomId);
    });
});
app.use(express.json());
console.log(path.join(__dirname, "../front-end/build/index.html"));

app.use(express.static(path.join(__dirname, 'front-end/build')))
app.use("/api/images", imageRouter);
app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../front-end/build/index.html"));
});
server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
