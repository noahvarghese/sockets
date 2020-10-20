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
import redis from "socket.io-redis";
import {
    startRedisServer
} from "./redis.js";
// import redis from "redis";
import RedisAccess from "./Util/RedisAccess.js";
import {
    isEmpty
} from "./Util/Functions.js";

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
    // io.adapter(redis({
    //     host: "localhost",
    //     port: 6379
    // }));

    // Serve frontend
    app.get("/", (_, res) => {
        res.sendFile(__dirname + "/public/index.html");
    });

    io.on("connection", socket => {

        /**
         * should check if room exists
         * create room (rooms: String[] => [])
         * assign teacher room
         * key: room, value: teacher
         */
        socket.on("room", data => {
            // query database for room
            socket.join(data);
        });

        socket.on("checkName", async (name) => {
            const exists = await redisAccess.queryField("names", name, true);
            io.to(socket.id).emit("checkNameResponse", exists);
        });

        socket.on("createName", async (data) => {
            const {
                name,
                role
            } = data[0];

            const result = await redisAccess.createItem("names", name, true, socket.id);
            const success = result && await redisAccess.createItem(role, name, true);

            io.to(socket.id).emit("createNameResponse", success);
        });

        socket.on("checkServer", async (server) => {
            const exists = await redisAccess.queryField("servers", server, true);
            io.to(socket.id).emit("checkServerResponse", exists);
        });

        socket.on("createServer", async (data) => {
            const {
                name,
                server
            } = data[0];
            const success = redisAccess.createItem("servers", server, true, name);

            if (success) {
                socket.join(server);
            }

            io.to(socket.id).emit("createServerResponse", success);
        });

        socket.on("joinServer", async (server) => {
            socket.join(server);
            // console.log(io.sockets.adapter.rooms);
        });

        socket.on("createQuestion", async data => {
            const name = await redisAccess.getValue(socket.id);
            const server = await redisAccess.getValue(name);

            console.log(data);
            await redisAccess.createItem(server, data);
            socket.to(server).emit("sendQuestion", message);
            // io.to(server).emit("sendMessage", message);
        });

        socket.on("disconnect", async () => {

            // get values to delete
            const name = (await redisAccess.getValue(socket.id)).reply;
            const server = (await redisAccess.getValue(name)).reply;

            if (!isEmpty(name) && !isEmpty(server)) {
                // console.log(`Disconnect ${socket.id}: ${name}, ${server}`)

                const headCount = io.sockets.adapter.rooms.length;
                console.log(headCount);
                if (headcount > 1) {
                    // emit event to everyone in room
                    // frontend to direct suer back to serverID so that teacher can reconnect
                }

                await redisAccess.deleteItem("servers", server);
                await redisAccess.deleteItem("names", name);
                await redisAccess.deleteItem(server);
                await redisAccess.deleteItem(name);
                await redisAccess.deleteItem(socket.id);
            }
        });
    });

    server.listen(4000, () => {
        console.log("listening on *:4000");
    })
})();