import * as KoaRouter from 'koa-router';
import { DefaultController, UserController } from './app_module';

class Router {
  private router: KoaRouter;
  private DefaultController: DefaultController;
  private UserController: UserController;
  constructor() {
    this.router = new KoaRouter();
    this.DefaultController = new DefaultController();
    this.UserController = new UserController();
    this.router.use(
      '/',
      this.DefaultController.getRouter().routes(),
      this.DefaultController.getRouter().allowedMethods(),
    );
    this.router.use(
      '/user',
      this.UserController.getRouter().routes(),
      this.UserController.getRouter().allowedMethods(),
    );
  }

  public getRouter() {
    return this.router;
  }
}

export default Router;
