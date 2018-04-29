const router = require('koa-router')();
const log = require('log4js').getLogger('ResourceController');
const ResourceService = require('./ResourceService');
const Util = require('../../util/Util');
const RESOLVE = (resolve, reject) => {
    resolve();
}

class ResourceController {
    constructor() {
        this.router = router;
        this.ResourceService = new ResourceService();
        this.router.get('/all', this.getAll.bind(this));
        this.router.get('/', this.getOneResource.bind(this));
    }

    getRouter() {
        return this.router;
    }

    async getAll(ctx, next) {
        await new Promise((resolve, reject) => {
            if (ctx.query) {
                resolve();
            } else {
                reject(Util.genUniError(400, 'params missing'));
            }
        }).then(() => {
            return this.ResourceService.retrieveAllResource(ctx.query);
        }).then(results => {
            return ctx.sendJson(log, results);
        }).catch(err => {
            return ctx.sendError(log, err);
        });
    }

    async getOneResource(ctx, next) {
        await new Promise((resolve, reject) => {
            if (ctx.query && ctx.query.id) {
                resolve();
            } else {
                reject(Util.genUniError(400, 'params missing'));
            }
        }).then(() => {
            return this.ResourceService.getResourceById(ctx.query.id);
        }).then(result => {
            return ctx.sendJson(log, result);
        }).catch(err => {
            return ctx.sendError(log, err);
        });
    }

}

module.exports = ResourceController;