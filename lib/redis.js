import Redis from "ioredis";

let redisClient = new Redis(process.env.NEXT_PUBLIC_UPSTASH_URI);

export default redisClient;
