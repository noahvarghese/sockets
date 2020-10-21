import redis from "redis";
import {
    isEmpty,
    isValidResponse
} from "./Functions.js";

export default class RedisAccess {

    constructor() {
        this.client = redis.createClient();
    }

    queryField = async (key, value, set = false) => {
        let exists = false;

        const response = await new Promise((res, rej) => {

            if (set) {
                this.client.sismember(key, value, (err, reply) => {
                    res(reply);
                });
            } else {
                res(this.getValue(key));
            }
        });

        if ((set && response > 0) || (!set && response !== null)) {
            exists = true;
        }

        return exists;
    }

    createItem = async (key, value, set = false, secondaryKey = null) => {

        // let success = false;

        const exists = await this.queryField(key, value, set);


        if (exists === false) {

            let method;
            let success = false;

            if (set) {
                method = "sadd";
            } else {
                method = "set";
            }
            const result = await new Promise((res, rej) => {
                this.client[method](key, value, async (err, reply) => {
                    if (err) {
                        console.log(err);
                    }
                    if (!err && reply === 1 && secondaryKey !== null) {
                        res(await this.createItem(secondaryKey, value));
                    }
                    res({
                        err,
                        reply
                    });
                });
            });


            // bug where on page refresh assignment doesn't work?
            // result returns undefined
            // maybe something not being deleted?

            if (typeof result === "object") {
                if (isValidResponse(result.reply) && isEmpty(result.err)) {
                    success = true;
                }
            } else {
                if (isValidResponse(result)) {
                    success = true;
                }
            }
            console.log(success);
            return success;
        }
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

        return value.reply;
    }

    deleteItem = async (key, value = null) => {
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