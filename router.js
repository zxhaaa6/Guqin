const KoaRouter = require('koa-router');
const DefaultPageController = require('./app_service/default/DefaultPageController');
const UserController = require('./app_service/user/UserController');

class Router {
    constructor() {
        this.router = new KoaRouter();
        this.DefaultPageController = new DefaultPageController();
        this.UserController = new UserController();

        this.router.use('/', this.DefaultPageController.getRouter().routes(), this.DefaultPageController.getRouter().allowedMethods());
        this.router.use('/user', this.UserController.getRouter().routes(), this.UserController.getRouter().allowedMethods());
        
    }

    getRouter() {
        return this.router;
    }
}

module.exports = Router;