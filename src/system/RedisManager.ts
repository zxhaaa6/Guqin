import * as Promise from 'bluebird';
import { getLogger } from 'log4js';
import * as redis from 'redis';
import config from '../config/config';

const redisConfig = config.redis;
const log = getLogger('RedisManager');
Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

class RedisManager {
  public static redisClient;
  public static redisDb;
  public static connectRedisDbServer() {
    return new Promise((resolve, reject) => {
      const host = process.env.REDIS_HOST || redisConfig.host;
      const port =
        (process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : null) ||
        redisConfig.port;
      const client = redis.createClient(port, host);
      client.on('ready', () => {
        this.redisClient = client;
        this.redisDb = redisConfig.db;
        log.info('[Redis]DB connection has been established successfully.');
        resolve();
      });
      client.on('error', err => {
        reject(err);
      });
    });
  }
  public static getRedisClient() {
    return this.redisClient;
  }
  public static getRedisDb() {
    return this.redisDb;
  }
}

export default RedisManager;
