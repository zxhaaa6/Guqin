const RedisManager = require('./RedisManager');
const MongodbManager = require('./MongodbManager');
const config = require("../config/config");
const log = require("log4js").getLogger("InitialMaster");
const Util = require('../util/Util');
const _this = exports;
const resolve = function(res) {
    res();
};

_this.initProcess = async function() {
    try {
        log.info("initProcess...");
        await RedisManager.connectRedisDbServer();
        await MongodbManager.connectMongodbServer();
        log.info('✓ initProcess Success');
    } catch (err) {
        Util.throwUpErr(log, err, "initProcess");
    }
};

_this.fillMasterDataCache = async function() {
    try {
        let cacheTotalCount = 3;
        log.info("fillMasterDataCache...");
        // 1. initUserCache
        log.info('[1/' + cacheTotalCount + ']initUserCache');
        const UserCacheService = require('../app_service/user/UserCacheService');
        await new UserCacheService().initUserCache();
        // 2. initCategoryCache
        log.info('[2/' + cacheTotalCount + ']initCategoryCache');
        const CategoryCacheService = require('../app_service/category/CategoryCacheService');
        await new CategoryCacheService().initCategoryCache();
        // 3. initTagCache
        log.info('[3/' + cacheTotalCount + ']initTagCache');
        const TagCacheService = require('../app_service/tag/TagCacheService');
        await new TagCacheService().initTagCache();
    } catch (err) {
        Util.throwUpErr(log, err, "fillMasterDataCache");
    }
};