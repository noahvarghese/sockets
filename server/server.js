import express from "express";
import {
    fileURLToPath
} from "url";
import {
    dirname
} from "path";
import http from "http";
import io from "socket.io";

const __filename = fileURLToPath(
    import.meta.url);
const __dirname = dirname(__filename);

(async () => {
    console.log(__dirname);
    const app = express();
    app.use(express.json());
    app.use(express.static(__dirname + "/public/"));

    app.get(/.*/, (_, res) => {
        res.sendFile(__dirname + "/public/index.html");
    })

    app.listen(3000, () => {
        console.log("Server is ready");
    })
})();