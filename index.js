const express = require('express');
const http = require('http');
const cors = require('cors');
const app = express()
const { Server } = require('socket.io');

app.use(cors())
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
})
io.on("connection", (socket) => {
    console.log("User connected", socket.id)

    socket.on("join_room", (data) => {
        socket.join(data)
        console.log(`User id ${socket.id} joined room ${data}`)
    })

    socket.on("send_message", (data) => {
        socket.to(data.roomid).emit("receive_message", data)
        console.log("data", data)
    })

    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
    })
})
server.listen(8000, () => {
    console.log("Server running on port 8000");
})