import { Redis } from "@upstash/redis";
import config from "@/lib/config";

const redis = new Redis({
    url : config.env.redisUrl,
    token : config.env.redisToken
})
export default redis;