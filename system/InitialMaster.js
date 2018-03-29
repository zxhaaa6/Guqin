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
    log.info("initProcess...");
    await RedisManager.connectRedisDbServer();
    await MongodbManager.connectMongodbServer();
    log.info('✓ initProcess Success');
};

_this.fillMasterDataCache = function() {
    let cacheTotalCount = 1;
    return new Promise((resolve, reject) => {
        log.info("fillMasterDataCache...");
        resolve();
    }).then(() => {
        log.info('[1/' + cacheTotalCount + ']initUserCache');
        // let UserCacheService = require('../app_service/user/UserCacheService');
        // return new UserCacheService().initUserCache();
    }).then(() => {
        log.info('✓ fillMasterDataCache Success');
    }).catch(err => {
        Util.throwUpErr(log, err, "fillMasterDataCache");
    });
};