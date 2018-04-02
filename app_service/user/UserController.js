const router = require('koa-router')();
const log = require('log4js').getLogger('UserController');
const Util = require('../../util/Util');

class DefaultPageController {
    constructor() {
        this.router = router;
        this.router.get('/user', this.getUser);
        this.router.post('/login', this.postLogin);
    }

    getRouter() {
        return this.router;
    }

    getUser(ctx, next) {
        return ctx.sendJson(log, 'user');
    }

    postLogin(ctx, next) {

        return ctx.sendPage(log, 'default/Home');
    }
}

module.exports = DefaultPageController;