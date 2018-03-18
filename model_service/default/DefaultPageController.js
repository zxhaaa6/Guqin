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
        let data = Util.genUniError(401, '不被认可！');
        ctx.sendError(log, data);
    }
}

module.exports = DefaultPageController;