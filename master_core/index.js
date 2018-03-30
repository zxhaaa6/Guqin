const UserCacheService = require('../app_service/user/UserCacheService');

let registMethod = {
    initUserCache: new UserCacheService().initUserCache,
};

module.exports = registMethod;