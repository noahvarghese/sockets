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

            let exists = false;

            const response = await new Promise((res, rej) => {
                client.sismember("names", data, (err, reply) => {
                    res({
                        err,
                        reply
                    });
                });
            });

            if (response.reply !== 0) {
                exists = true;
            }

            io.to(socket.id).emit("checkNameResponse", exists);
        });

        socket.on("createName", async (data) => {
            console.log(data);
            let errors = false;

            const exists = await new Promise((res, rej) => {
                client.sismember("names", data, (err, reply) => {
                    res({
                        err,
                        reply
                    });
                });
            });

            console.log(exists.reply);

            if (exists.reply === 0) {
                const added = await new Promise((res, _) => {
                    client.sadd("names", data, (err, reply) => res({
                        err,
                        reply
                    }));
                    client.set(socket.id, data);
                });
                console.log(added);

                if (added.reply === 0) {
                    errors = true;
                }
            }

            io.to(socket.id).emit("createNameResponse", errors);

        });

        // 
        socket.on("disconnect", () => {
            client.get(socket.id, (err, reply) => {
                console.log(reply);
                if (!err) {
                    client.srem("names", reply, (err, _) => {
                        if (!err) {
                            client.del(socket.id);
                        }
                    });
                }
            });
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