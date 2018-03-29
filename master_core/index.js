const UserCacheService = require('../model_service/user/UserCacheService');
const ArticleCacheService = require('../model_service/article/ArticleCacheService');

let registMethod = {
    initUserCache: new UserCacheService().initUserCache,
    ArticleCacheService: new ArticleCacheService().initNoneReplyArticleCache
};

module.exports = registMethod;