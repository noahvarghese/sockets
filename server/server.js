import express from "express";
import {
    fileURLToPath
} from "url";
import {
    dirname
} from "path";
import http from "http";
import socketIo from "socket.io";

const __filename = fileURLToPath(
    import.meta.url);
const __dirname = dirname(__filename);


(async () => {
    const app = express();
    app.use(express.json());
    app.use(express.static(__dirname + "/public/"));
    const server = http.createServer(app);
    const io = socketIo(server);

    app.get(/.*/, (_, res) => {
        res.sendFile(__dirname + "/public/index.html");
    });

    app.listen(3000, () => {
        console.log("Server is ready");
    });

    const getApiAndEmit = socket => {
        const response = new Date();
        socket.emit("FromAPI", response);
    }

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
    })
})();