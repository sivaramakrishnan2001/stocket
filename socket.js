import { createServer } from "http";
import { Server } from "socket.io";
import { DBConnection } from "./db/DBConnection.js";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

// ==================================================================

DBConnection();

// ==================================================================
// middleware

// ==================================================================
// server

// old
// const io = new Server(process.env.PORT, {
//     pingTimeout: 60000,
//     cors: {
//         origin: [process.env.LOCAL, process.env.DEV, process.env.DEV1]
//     }
// });

const app = express();
const httpServer = createServer(app);

// new
// const io = new Server(httpServer, {
//     pingTimeout: 60000,
//     cors: {
//         origin: [process.env.LOCAL, process.env.DEV, process.env.DEV1]
//     }
// });

const io = new Server(httpServer);

// const server = createServer(app);
// const io = socketIO(server);



// ==================================================================

var users = [];


io.on("connection", (socket) => {



    socket.on('addUser', (userId) => {
        addUser(userId, socket.id);
        console.log("users", users);
        io.emit('getUsers', users);
    })

    socket.on('sendMessage', ({ senderId, receiverId, text }) => {
        const user = getUser(receiverId);
        io.to(user?.socketId).emit("getMessage",
            {
                senderId,
                text
            }
        )
    })

    socket.on("disconnect", () => {
        console.log("a user disconnected!");

    });
});

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId });
}

const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
}




httpServer.listen(process.env.PORT, () => {
    console.log(`server started http://localhost:${process.env.PORT}`);
});

