import { createHmac } from 'crypto';
import { sign } from 'jsonwebtoken';
import { getLogger } from 'log4js';
import secret from '../../private';
import { throwErr, throwUpErr, validateEmail } from '../../util/Util';
import UserDao from './UserDao';

const log = getLogger('UserService');

class UserService {
  private UserDao: UserDao;
  constructor() {
    this.UserDao = new UserDao();
  }
  public async validateUser(username: string, password: string) {
    try {
      if (validateEmail(username)) {
        return await this.validateUserByEmail(username, password);
      }
      return await this.validateUserByPhone(username, password);
    } catch (err) {
      throwUpErr(log, err, 'validateUser');
    }
  }
  public async findOneUser(id) {
    try {
      return await this.UserDao.retrieveUserById(id);
    } catch (err) {
      throwUpErr(log, err, 'findOneUser');
    }
  }
  public async validateUserByEmail(email: string, password: string) {
    try {
      password = createHmac('sha256', secret)
        .update(password)
        .digest('hex');
      const query = {
        email,
        password,
      };
      const user = await this.UserDao.retrieveOneUser(query);
      if (user) {
        return sign({ data: user }, secret, { expiresIn: '8h' });
      }
      throwErr(log, 401, 'email or pass is wrong');
    } catch (err) {
      throwUpErr(log, err, 'validateUserByEmail');
    }
  }
  public async validateUserByPhone(phone: string, password: string) {
    try {
      password = createHmac('sha256', secret)
        .update(password)
        .digest('hex');
      const query = {
        phone,
        password,
      };
      const user = await this.UserDao.retrieveOneUser(query);
      if (user) {
        return sign({ data: user }, secret, { expiresIn: '8h' });
      }
      throwErr(log, 401, 'phone or pass is wrong');
    } catch (err) {
      throwUpErr(log, err, 'validateUserByPhone');
    }
  }
}

export default UserService;
