const log = require('log4js').getLogger('DefaultPageController');
const Util = require('../../util/Util');

class DefaultPageController {
    constructor(router) {
        this.router = router.get('/', this.getDefaultPage);
    }

    getRouter() {
        return this.router;
    }

    getDefaultPage(ctx, next) {
        return ctx.sendPage(log, 'default/Home');
    }
}

module.exports = DefaultPageController;