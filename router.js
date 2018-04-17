const KoaRouter = require('koa-router');
const DefaultPageController = require('./app_service/default/DefaultPageController');
const UserController = require('./app_service/user/UserController');
const CategoryController = require('./app_service/category/CategoryController');
const TagController = require('./app_service/tag/TagController');
const ResourceController = require('./app_service/resource/ResourceController');

class Router {
    constructor() {
        this.router = new KoaRouter();
        this.DefaultPageController = new DefaultPageController();
        this.UserController = new UserController();
        this.CategoryController = new CategoryController();
        this.TagController = new TagController();
        this.ResourceController = new ResourceController();

        this.router.use('/', this.DefaultPageController.getRouter().routes(), this.DefaultPageController.getRouter().allowedMethods());
        this.router.use('/user', this.UserController.getRouter().routes(), this.UserController.getRouter().allowedMethods());
        this.router.use('/category', this.CategoryController.getRouter().routes(), this.CategoryController.getRouter().allowedMethods());
        this.router.use('/tag', this.TagController.getRouter().routes(), this.TagController.getRouter().allowedMethods());
        this.router.use('/resource', this.ResourceController.getRouter().routes(), this.ResourceController.getRouter().allowedMethods());
        
    }

    getRouter() {
        return this.router;
    }
}

module.exports = Router;