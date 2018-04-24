const router = require('koa-router')();
const log = require('log4js').getLogger('DefaultPageController');
const Util = require('../../util/Util');
const DefaultPageService = require('./DefaultPageService');

const RESOLVE = (resolve, reject) => {
    resolve();
}

class DefaultPageController {
    constructor() {
        this.router = router;
        this.DefaultPageService = new DefaultPageService();
        this.router.get('/', this.getDefaultPage.bind(this));
    }

    getRouter() {
        return this.router;
    }

    async getDefaultPage(ctx, next) {
        const viewData = {};
        await new Promise(RESOLVE).then(() => {
            return this.DefaultPageService.getDefaultData(viewData);
        }).then(() => {
            //return ctx.sendJson(log, viewData);
            return ctx.sendPage(log, 'default/Home');
        }).catch(err => {
            return ctx.sendError(log, err);
        });
    }
}

module.exports = DefaultPageController;