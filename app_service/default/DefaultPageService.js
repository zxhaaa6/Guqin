const moment = require('moment');
const Util = require('../../util/Util');
const log = require("log4js").getLogger("DefaultPageService");
const ResourceCacheService = require('../resource/ResourceCacheService');

class DefaultPageService {
    constructor() {
        this.ResourceCacheService = new ResourceCacheService();
    }

    async getDefaultData(viewData) {
        try {
            const hotResource = await this.ResourceCacheService.getHotResource();
            return hotResource;
        } catch (err) {
            Util.throwUpErr(log, err, 'getDefaultData');
        }
    }

}

module.exports = DefaultPageService;