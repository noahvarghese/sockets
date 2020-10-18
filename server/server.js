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

const __filename = fileURLToPath(
    import.meta.url);
const __dirname = dirname(__filename);

const whiteList = [
    "http://localhost:3001"
];


(async () => {
    const app = express();
    app.use(cors({
        origin: (origin, callback) => {
            if (whiteList.indexOf(origin) !== -1) {
                callback(null, true);
            } else {
                callback(null, false);
            }
        },
        credentials: true
    }))
    app.use(express.json());
    app.use(express.static(__dirname + "/public/"));
    const server = http.createServer(app);
    const io = socketIo(server);

    app.get("/", (_, res) => {
        res.sendFile(__dirname + "/public/index.html");
    });

    // app.listen(3000, () => {
    //     console.log("Server is ready");
    // });

    let interval;
    io.on("connection", socket => {
        console.log("New client connected");
        if (interval) {
            clearInterval(interval);
        }

        interval = setInterval(() => getApiAndEmit(socket), 1000);
        socket.on("disconnect", () => {
            console.log("Client disconnected");
            clearInterval(interval);
        });
    });

    const getApiAndEmit = socket => {
        const response = new Date();
        console.log(response);
        socket.emit("FromAPI", response);
    }

    server.listen(3000, () => {
        console.log("listening on *:3000");
    })
})();