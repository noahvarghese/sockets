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
import RedisAccess from "./Util/RedisAccess.js";

const __filename = fileURLToPath(
    import.meta.url);
const __dirname = dirname(__filename);

(async () => {

    await startRedisServer();

    const client = redis.createClient();

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
        console.log(`New client connected`);

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

        socket.on("checkName", async (data) => {
            const exists = await redisAccess.queryField("names", data, true);
            io.to(socket.id).emit("checkNameResponse", exists);
        });

        socket.on("createName", async (data) => {

            const success = redisAccess.createItem("names", data, true, socket.id);

            io.to(socket.id).emit("createNameResponse", success);

        });

        // 
        socket.on("disconnect", () => {
            client.get(socket.id, async (err, reply) => {
                if (reply !== null) {
                    if (await redisAccess.deleteItem("names", reply)) {
                        await redisAccess.deleteItem(socket.id);
                    }
                }
            });
        });
    });

    server.listen(4000, () => {
        console.log("listening on *:4000");
    })
})();