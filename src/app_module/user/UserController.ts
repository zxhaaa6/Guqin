import * as Router from 'koa-router';
import { getLogger } from 'log4js';
import { throwErr } from '../../util/Util';
import UserService from './UserService';

const log = getLogger('UserController');

class UserController {
  private router: Router;
  private UserService: UserService;
  constructor() {
    this.router = new Router();
    this.UserService = new UserService();
    this.router.get('/:id', this.getUser.bind(this));
    this.router.post('/login', this.login.bind(this));
  }
  public getRouter() {
    return this.router;
  }
  public async getUser(ctx) {
    try {
      if (!ctx.params.id) {
        throwErr(log, 400, 'required params');
      }
      const user = await this.UserService.findOneUser(ctx.params.id);
      ctx.sendJson(log, user);
    } catch (err) {
      ctx.sendError(log, err);
    }
  }
  public async login(ctx) {
    try {
      if (!ctx.request.body.username || !ctx.request.body.password) {
        throwErr(log, 400, 'required params');
      }
      const token = await this.UserService.validateUser(
        ctx.request.body.username,
        ctx.request.body.password,
      );
      ctx.sendJson(log, { token });
    } catch (err) {
      ctx.sendError(log, err);
    }
  }
}

export default UserController;
