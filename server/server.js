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
            console.log(`Data: ${data}`);

            let exists = false;

            const response = await new Promise((res, rej) => {
                client.sismember("names", data, (err, reply) => {
                    res({
                        err,
                        reply
                    });
                });
            });

            console.log(response);

            if (response.reply !== 0) {
                exists = true;
            }

            io.to(socket.id).emit("checkNameResponse", exists);
        });

        socket.on("createName", async (data) => {
            let errors = false;

            const exists = await new Promise((res, rej) => {
                client.scard("names", (err, reply) => {
                    res({
                        err,
                        reply
                    });
                });
            });

            if (exists.reply === 0) {
                const added = await new Promise((res, _) => {
                    client.sadd("names", data, (err, reply) => res({
                        err,
                        reply
                    }));
                });

                if (added.reply === 0) {
                    errors = true;
                }
            }

            io.to(socket.id).emit("checkNameResponse", errors);

        });

        socket.on("getNames", () => {
            client.get("names", (err, reply) => {
                console.log(err);
                console.log(reply);
            })
        })

        // 
        socket.on("disconnect", () => {
            console.log("Client disconnected");
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