class DefaultPageController {
    constructor(router) {
        this.router = router.get('/', this.getDefaultPage);
    }

    getRouter() {
        return this.router;
    }

    getDefaultPage(ctx, next) {
        ctx.body = 'Hello World';
    }
}

module.exports = DefaultPageController;