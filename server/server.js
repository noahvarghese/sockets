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
    iterateCheckEquivalent,
    shuffle
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
            const existsInNames = await redisAccess.queryField("names", name, true);
            const existsInServer = await redisAccess.queryField("servers", name, true);

            io.to(socket.id).emit("checkNameResponse", existsInNames || existsInServer);
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
            const existsInServer = await redisAccess.queryField("servers", server, true);
            const existsInNames = await redisAccess.queryField("names", server, true);

            io.to(socket.id).emit("checkServerResponse", existsInServer || existsInNames);
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
        });

        socket.on("createQuestion", async data => {
            const name = await redisAccess.getValue(socket.id);
            const server = await redisAccess.getValue(name);
            const question = data[0];

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

            if (question.info.type === "Multiple Choice") {
                let studentVersion = [];
                question.multipleChoice.answers.forEach((answer) => {
                    studentVersion.push({
                        text: answer.text,
                        correct: false
                    });
                });

                studentData.multipleChoice.answers = studentVersion;
            } else if (question.info.type === "Matching Pairs") {
                studentData.matching.vals = shuffle(studentData.matching.vals)
            }

            socket.to(server).emit("sendQuestion", studentData);
            let time = studentData.info.time;
            let interval = setInterval(() => {
                // broadcast time remaining to everyone in room
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

            let firstObject;
            let secondObject;

            if (question.info.type === "Multiple Choice") {
                firstObject = answer;
                secondObject = question.multipleChoice.answers;

            } else if (question.info.type === "Matching Pairs") {
                firstObject = {
                    properties: question.matching.properties,
                    vals: question.matching.vals
                };
                secondObject = {
                    properties: answer.properties,
                    vals: answer.vals
                };
            }

            const correct = iterateCheckEquivalent(firstObject, secondObject);

            if (correct) {
                score = Number(question.info.score) + Number(score);
                if (!await redisAccess.createItem(name, String(score))) {
                    console.log("ERROR");
                }
            }

            socket.emit("sendCorrect", correct ? "Correct!" : "Incorrect");
            // return updated score to student
            socket.emit("setScore", score);

            // get all sockets in room, and enuerate over them
            // check if the value stored matches the server sent by the student
            const keys = Object.keys(io.sockets.adapter.rooms[server].sockets);

            for (let i = 0; i < keys.length; i++) {
                const teacherName = await redisAccess.getValue(keys[i]);
                const value = await redisAccess.getValue(teacherName);

                if (value === server) {
                    io.to(keys[i]).emit("sendResponse", {
                        name,
                        score
                    });
                    break;
                }
            }
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