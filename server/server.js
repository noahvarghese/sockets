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
} from "./Util/redis.js";
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

            await redisAccess.createItem(server, JSON.stringify(data));

            // remove correct field from data
            let studentData = {
                info: data[0].info,
                matching: data[0].matching,
                multipleChoice: {
                    question: data[0].multipleChoice.question,
                    answers: undefined
                }
            };

            if (data[0].info.type === "Multiple Choice") {
                let studentVersion = [];
                data[0].multipleChoice.answers.forEach((answer, index) => {
                    studentVersion.push({
                        answer: answer.answer,
                        correct: false
                    });
                });

                studentData.multipleChoice.answers = studentVersion;
            }

            socket.to(server).emit("sendQuestion", studentData);
            let time = studentData.info.time;
            let interval = setInterval(() => {
                // braodcast time remaingin to everyone in room
                io.in(server).emit("timeLeft", time);
                if (time === 0) {
                    clearInterval(interval);
                }
                time -= 1;
            }, 1000);
        });

        socket.on("disconnect", async () => {

            // get values to delete
            const name = await redisAccess.getValue(socket.id);
            const server = await redisAccess.getValue(name);

            if (!isEmpty(name) && !isEmpty(server)) {
                // console.log(`Disconnect ${socket.id}: ${name}, ${server}`)

                const headCount = io.sockets.adapter.rooms.length;
                if (headCount > 1) {
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