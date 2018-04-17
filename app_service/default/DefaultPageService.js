const moment = require('moment');
const Util = require('../../util/Util');
const log = require("log4js").getLogger("DefaultPageService");
const CategoryCacheService = require('../category/CategoryCacheService');
const TagCacheService = require('../tag/TagCacheService');
const UserCacheService = require('../user/UserCacheService');

class DefaultPageService {
    constructor() {

        this.CategoryCacheService = new CategoryCacheService();
        this.TagCacheService = new TagCacheService();
        this.UserCacheService = new UserCacheService();
    }

    async getDefaultData() {
        try {
            
        } catch (err) {
            Util.throwUpErr(log, err, 'getDefaultData');
        }
    }

}

module.exports = DefaultPageService;