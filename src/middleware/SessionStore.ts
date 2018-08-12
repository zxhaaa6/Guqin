import RedisManager from '../system/RedisManager';

class SessionStore {
  public redis;
  constructor() {
    this.redis = RedisManager.getRedisClient();
  }
  public async get(key) {
    const data = await this.redis.get(`SESSION:${key}`);
    return JSON.parse(data);
  }
  public async set(key, session, maxAge) {
    await this.redis.set(
      `SESSION:${key}`,
      JSON.stringify(session),
      'EX',
      maxAge / 1000,
    );
    return key;
  }
  public async destroy(key) {
    return this.redis.del(`SESSION:${key}`);
  }
}

export default SessionStore;
