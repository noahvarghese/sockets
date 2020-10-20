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
                res(this.getValue(key));
            }
        });

        if ((set && response.reply > 0) || (!set && response.reply !== null)) {
            exists = true;
        }

        return exists;
    }

    createItem = async (key, value, set = false, secondaryKey = null) => {

        let success = false;

        const exists = await this.queryField(key, value, set);


        if (exists === false) {

            const added = await new Promise((res, _) => {

                if (set) {

                    this.client.sadd(key, value, (err, reply) => {

                        if (!err && reply === 1 && secondaryKey !== null) {
                            // so we can identify user specific fields by socket id
                            // used to free up screen name when client disconnects
                            this.createItem(secondaryKey, value);
                        }
                    });
                } else {
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

    getValue = async (key) => {
        const value = await new Promise((res, rej) => {
            this.client.get(key, (err, reply) => {
                res({
                    err,
                    reply
                });
            });
        });

        return value;
    }

    deleteItem = async (key, value = null) => {
        const removed = await new Promise((res, _) => {
            if (value !== null) {
                this.client.srem(key, value, (err, _) => {
                    res(!err);
                });
            } else {
                this.client.del(key, (err, _) => {
                    console.log(key, err);
                    res(!err);
                });
            }
        });

        return removed;
    }

}