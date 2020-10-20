import RedisServer from "redis-server";

export const startRedisServer = async (port = 6379) => {
    return new Promise((res, rej) => {
        const server = new RedisServer({
            port: port,
            bin: "./redis-server"
        });

        server.open()
            .then(() => {
                console.log(`Redis server started on port: ${port}`);
                res()
            })
            .catch(err => {
                console.log(err);
                rej(err);
            });
    });
}