import { getLogger } from 'log4js';
import { IUser, User } from '../../app_model/User';
import { throwUpErr } from '../../util/Util';
import AbstractDao from '../abstract/AbstractDao';

const log = getLogger('UserDao');

class UserDao extends AbstractDao {
  constructor() {
    super(User);
  }
  public async retrieveUserById(id): Promise<IUser> {
    try {
      return await this.findDocumentById(id);
    } catch (err) {
      throwUpErr(log, err, 'retrieveUserById');
    }
  }
  public async retrieveOneUser(query: object): Promise<IUser> {
    try {
      return await this.findOneDocument(query);
    } catch (err) {
      throwUpErr(log, err, 'retrieveOneUser');
    }
  }
  public async retrieveAllUsers(): Promise<IUser[]> {
    try {
      return await this.findDocuments();
    } catch (err) {
      throwUpErr(log, err, 'retrieveAllUsers');
    }
  }
}

export default UserDao;
