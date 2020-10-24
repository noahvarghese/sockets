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
    isEmpty,
    iterateCheckEquivalent
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
            let success = result && await redisAccess.createItem(role, name, true);

            if (role === "Student") {
                success = success && await redisAccess.createItem(name, 0);
            }

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
            const question = {
                ...data[0]
            };

            await redisAccess.createItem(server, JSON.stringify(question));

            // remove correct field from data
            let studentData = {
                info: question.info,
                matching: question.matching,
                multipleChoice: {
                    question: question.multipleChoice.question,
                    answers: undefined
                }
            };

            if (data[0].info.type === "Multiple Choice") {
                let studentVersion = [];
                data[0].multipleChoice.answers.forEach((answer) => {
                    studentVersion.push({
                        text: answer.text,
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

        socket.on("submitAnswer", async ({
            answer,
            server
        }) => {
            const name = await redisAccess.getValue(socket.id);
            const question = JSON.parse(await redisAccess.getValue(server));
            let score = await redisAccess.getValue(name);

            const correct = iterateCheckEquivalent(question, answer);
            console.log("Correct: ", correct);

            if (correct) {
                score = Number(question.info.score) + Number(score);
                await redisAccess.createItem(name, score);
            }
            console.log("Score: ", score);

            // return updated score to student
            socket.emit("setScore", score);
            // return students score to teacher
            socket.emit("sendResponse", {
                name: name,
                score: score
            });
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