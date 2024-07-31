const express = require("express");
const app = express();
const http = require("http");
const imageRouter = require("./routes/images");
const path = require("path");
const { runWith } = require("firebase-functions");
require("dotenv").config();
const server = http.createServer(app);
const options = {
    cors: {
        origin: "*",
    },
};

const io = require("socket.io")(server, options);
const usersOnline = [];
io.on("connection", (socket) => {
    socket.on("join", (data, roomId) => {
        console.log("join", data, roomId);
        socket.join(roomId);
        socket.to(roomId).emit("join", data);
        usersOnline.push(socket.id);
        io.sockets.emit("usersOnline", usersOnline);
        console.log(usersOnline);
    });
    socket.on("drawing", (data, roomId) => {
        console.log("drawing", data);
        socket.to(roomId).emit("drawing", data);
    });
    socket.on("clear", (roomId) => {
        socket.to(roomId).emit("clear");
    });
    socket.on("leave", (roomId) => {
        console.log("leave", roomId, socket.id);
        socket.leave(roomId);
        usersOnline.splice(usersOnline.indexOf(socket.id), 1);
        io.sockets.emit("usersOnline", usersOnline);
    });
});
app.use(express.json());

app.use(express.static(path.join(__dirname, "../front-end/dist")));
app.use("/images", imageRouter);
app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../front-end/dist/index.html"));
});

exports.api = runWith({ memory: "512MB" }).https.onRequest(app);
