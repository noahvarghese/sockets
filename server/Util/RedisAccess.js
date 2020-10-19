import e, {
    response
} from "express";
import redis from "redis";

export default class RedisAccess {

    constructor() {
        this.client = redis.createClient();
    }

    queryField = async (key, value, set = false) => {
        let exists = false;

        const response = await new Promise((res, rej) => {

            if (set) {
                this.client.sismember(key, value, (err, reply) => {
                    res({
                        err,
                        reply
                    });
                });
            } else {
                this.client.get(key, (err, reply) => {
                    res({
                        err,
                        reply
                    });
                });
            }
        });

        if ((set && response.reply > 0) || (!set && response.reply !== null)) {
            exists = true;
        }

        return exists;
    }

    createItem = async (key, value, set = false, socketId = null) => {

        let success = false;

        const exists = await this.queryField(key, value, set);


        if (exists === false) {

            const added = await new Promise((res, _) => {

                if (set) {

                    this.client.sadd(key, value, (err, reply) => {
                        console.log(reply);

                        if (!err && reply === 1) {
                            // so we can identify user specific fields by socket id
                            // used to free up screen name when client disconnects
                            this.createItem(socketId, value);
                        }
                    });
                } else {
                    console.log(`Key: ${key}\nValue: ${value}`);
                    this.client.set(key, value, (err, reply) => {
                        res({
                            err,
                            reply
                        });
                    });
                }
            });

            if (added.reply === 0 && !added.err) {
                success = true;
            }
        }

        return success;
    }

    deleteItem = async (key, value = null) => {
        console.log(`Key: ${key}\nValue: ${value}`)
        const removed = await new Promise((res, _) => {
            if (value !== null) {
                this.client.srem(key, value, (err, _) => {
                    res(!err);
                });
            } else {
                this.client.del(key, (err, _) => {
                    res(!err);
                });
            }
        });

        return removed;
    }

}