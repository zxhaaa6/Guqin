import { getLogger } from 'log4js';
import * as mongoose from 'mongoose';
import * as Util from '../../util/Util';

const log = getLogger('AbstractDao');

class AbstractDao {
  private collection;
  private instance;
  constructor(model) {
    this.collection = model;
  }

  public async findDocumentById(
    id: string | mongoose.Schema.Types.ObjectId,
  ): Promise<any> {
    try {
      if (Util.checkObjectId(id)) {
        return await this.collection.findOne({ _id: id });
      }
      Util.throwErr(log, 406, 'Id is wrongful');
    } catch (err) {
      Util.throwUpErr(log, err, 'findDocumentById');
    }
  }

  public async findOneDocument(query: object = { id: '' }): Promise<any> {
    try {
      return await this.collection.findOne(query);
    } catch (err) {
      Util.throwUpErr(log, err, 'findOneDocument');
    }
  }

  public async findDocuments(query: object = {}): Promise<any[]> {
    try {
      return await this.collection.find(query);
    } catch (err) {
      Util.throwUpErr(log, err, 'findDocuments');
    }
  }

  public async findDocumentsWithSort(
    query: object = {},
    sort: object = { dateModified: -1 },
  ): Promise<any[]> {
    try {
      return await this.collection.aggregate([
        { $match: query },
        { $sort: sort },
      ]);
    } catch (err) {
      Util.throwUpErr(log, err, 'findDocumentsWithSort');
    }
  }

  public async countDocuments(query: object = {}): Promise<number> {
    try {
      return await this.collection.countDocuments(query);
    } catch (err) {
      Util.throwUpErr(log, err, 'countDocuments');
    }
  }

  public async findDocumentsPages(
    query: object = {},
    sort: object = { dateModified: -1 },
    start: number = 0,
    limit: number = 10,
  ): Promise<any> {
    try {
      return await this.collection.aggregate([
        { $match: query },
        { $sort: sort },
        { $skip: start },
        { $limit: limit },
      ]);
    } catch (err) {
      Util.throwUpErr(log, err, 'findDocumentsPages');
    }
  }

  public async createDocument(data: object): Promise<any> {
    try {
      this.instance = new this.collection(data);
      return await this.instance.save();
    } catch (err) {
      Util.throwUpErr(log, err, 'createDocument');
    }
  }

  public async updateDocuments(query: object, setData: object): Promise<any> {
    try {
      setData = Object.assign({ dateModified: new Date() }, setData);
      return await this.collection.update(query, { $set: setData });
    } catch (err) {
      Util.throwUpErr(log, err, 'updateDocuments');
    }
  }

  public async deleteDocumentById(id: string | mongoose.Schema.Types.ObjectId) {
    try {
      if (Util.checkObjectId(id)) {
        const query = { _id: id };
        const setData = { active: false };
        return await this.updateDocuments(query, setData);
      }
    } catch (err) {
      Util.throwUpErr(log, err, 'deleteDocumentById');
    }
  }
}

export default AbstractDao;
