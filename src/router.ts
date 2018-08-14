import * as KoaRouter from 'koa-router';
import { UserController } from './app_module';

class Router {
  private router: KoaRouter;
  private UserController: UserController;
  constructor() {
    this.router = new KoaRouter();
    this.UserController = new UserController();
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
