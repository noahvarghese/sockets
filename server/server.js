import express from "express";
import {
    fileURLToPath
} from "url";
import {
    dirname
} from "path";
import http from "http";
import socketIo from "socket.io";
import cors from "cors";
import {
    startRedisServer
} from "./redis.js";
import redis from "redis";

const __filename = fileURLToPath(
    import.meta.url);
const __dirname = dirname(__filename);

(async () => {

    await startRedisServer();

    const client = redis.createClient();

    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use(express.static(__dirname + "/public/"));

    const server = http.createServer(app);
    const io = socketIo(server);

    // Serve frontend
    app.get("/", (_, res) => {
        res.sendFile(__dirname + "/public/index.html");
    });

    io.on("connection", socket => {
        console.log("New client connected");

        // test to see what data comes our way
        socket.on("data", data => {
            console.log(data);
        });

        /**
         * should check if room exists
         * create room (rooms: String[] => [])
         * assign teacher room
         * key: room, value: teacher
         */
        socket.on("room", data => {
            // query database for room
            socket.join(data);
            console.log(data);
        });

        // 
        socket.on("disconnect", () => {
            console.log("Client disconnected");
            clearInterval(interval);
        });
    });

    // const getApiAndEmit = socket => {
    //     const response = "hi";
    //     console.log(response);
    //     socket.emit("FromAPI", response);
    // }

    server.listen(4000, () => {
        console.log("listening on *:4000");
    })
})();