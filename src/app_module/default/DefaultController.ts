import * as Router from 'koa-router';
import { getLogger } from 'log4js';
import { throwErr } from '../../util/Util';

const log = getLogger('UserController');

class UserController {
  private router: Router;
  constructor() {
    this.router = new Router();
    this.router.get('/', this.getHomePage.bind(this));
  }
  public getRouter() {
    return this.router;
  }
  public async getHomePage(ctx) {
    try {
      await ctx.render('index', { name: 'Berg' });
    } catch (err) {
      ctx.sendError(log, err);
    }
  }
}

export default UserController;
