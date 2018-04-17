const Util = require('../../util/Util');
const Promise = require('bluebird');
const log = require("log4js").getLogger("ResourceCacheService");
const RedisManager = require('../../system/RedisManager');
const RedisClient = RedisManager.getRedisClient();
const RedisDb = RedisManager.getRedisDb();

const ResourceDao = require('./ResourceDao');
const CategoryDao = require('../category/CategoryDao');

const RESOLVE = (resolve, reject) => {
    resolve();
};

class ResourceCacheService {
    constructor() {
        this.CategoryDao = new CategoryDao();
        this.ResourceDao = new ResourceDao();
    }

    async initHotResourceCache() {
        try {
            const cacheData = {};
            const categories = await this.CategoryDao.findAllCategorys();
            for (let item of categories) {
                if (!item.parentId) {
                    cacheData[item._id] = item._doc;
                    cacheData[item._id].resources = await this.ResourceDao.findHotResourceByCategoryLaId(item._id);
                }
            }
            await RedisClient.setAsync(RedisDb + '::hotResource', JSON.stringify(cacheData));
        } catch (err) {
            Util.throwUpErr(log, err, 'initHotResourceCache');
        }
    }

    async getHotResource() {
        try {
            const cacheData = await RedisClient.getAsync(RedisDb + '::hotResource');
            return JSON.parse(cacheData);
        } catch (err) {
            Util.throwUpErr(log, err, 'getHotResource');
        }
    }

}

module.exports = ResourceCacheService;