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
// import redis from "redis";
import RedisAccess from "./Util/RedisAccess.js";

const __filename = fileURLToPath(
    import.meta.url);
const __dirname = dirname(__filename);

(async () => {

    await startRedisServer();

    // const client = redis.createClient();

    const redisAccess = new RedisAccess();

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
        console.log(`New client connected ${socket.id}`);

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

        socket.on("checkName", async (name) => {
            const exists = await redisAccess.queryField("names", name, true);
            io.to(socket.id).emit("checkNameResponse", exists);
        });

        socket.on("createName", async (name) => {
            const success = redisAccess.createItem("names", name, true);
            io.to(socket.id).emit("createNameResponse", success);
        });

        socket.on("checkServer", async (server) => {
            const exists = await redisAccess.queryField("servers", server, true);
            io.to(socket.id).emit("checkServerResponse", exists);
        });

        socket.on("createServer", async (data) => {
            // console.log(data);
            const {
                name,
                server
            } = data[0];
            const success = redisAccess.createItem("servers", server, true, name);
            io.to(socket.id).emit("createServerResponse", success);
        });

        // 
        socket.on("cleanup", async ({
            name,
            server
        }) => {
            console.log(name, server);

            if (typeof name !== "undefined" && typeof server !== "undefined") {
                let success = false;

                success = await redisAccess.deleteItem("names", name);
                success = await redisAccess.deleteItem("servers", server);
                success = await redisAccess.deleteItem(name);
                console.log(`Deleted ${name}, ${server}: ${success}`);
            }
        });

        socket.on("disconnect", () => {
            // console.log("client disconnected");
        });
    });

    server.listen(4000, () => {
        console.log("listening on *:4000");
    })
})();