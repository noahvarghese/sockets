import redis from "redis";

class RedisClient {

    constructor() {
        this.client = redis.createClient();

        client.on("error", err => {
            console.log(err);
        });
    }

    get = key => {
        return this.client.get(key);
    }

    set = ({
        key,
        value
    }) => {
        this.client.set(key, value);
    }

    exists = ({
        keyOrValue,
        type
    }) => {
        if (type === "key") {
            this.client.exists(keyOrValue);
        } else if (type === "value") {

        }
    }

    delete = keyOrValue => {

    }
}