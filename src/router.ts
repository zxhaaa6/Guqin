import * as KoaRouter from 'koa-router';

class Router {
  private router: KoaRouter;
  constructor() {
    this.router = new KoaRouter();
  }

  public getRouter() {
    return this.router;
  }
}

export default Router;
