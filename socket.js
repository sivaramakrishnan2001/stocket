// import { createServer } from "http";
import { Server } from "socket.io";
import { DBConnection } from "./db/DBConnection.js";
import dotenv from "dotenv";


// ==================================================================
// server

const io = new Server(2001, {
    pingTimeout: 60000,
    cors: {
        origin: [process.env.LOCAL, process.env.DEV , process.env.DEV1]
    }
});

// ==================================================================

dotenv.config();
DBConnection();

// ==================================================================
// middleware


// httpServer.listen(2001, () => {
//     console.log(`server started http://localhost:${2001}`);
// });

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


