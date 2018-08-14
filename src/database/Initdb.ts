// tslint:disable-next-line
require('dotenv').config();
import { configure, getLogger } from 'log4js';
import { Category, Resource, Tag, User } from '../app_model';
import MongodbManager from '../system/MongodbManager';
import { CategoryData, ResourceData, TagData, UserData } from './faker_data';

const log = getLogger('InitDb');
configure({
  appenders: {
    console: {
      type: 'console',
      layout: {
        type: 'pattern',
        pattern: '%[[%d{yyyy-MM-dd hh:mm:ss}] [%p] [%c] %m%]',
      },
    },
  },
  categories: { default: { appenders: ['console'], level: 'info' } },
});

async function execInitDatabase() {
  await MongodbManager.connectMongodbServer();
  const insertDatas = [
    {
      collectionName: 'user',
      model: User,
      datas: UserData(),
    },
    {
      collectionName: 'category',
      model: Category,
      datas: CategoryData(),
    },
    {
      collectionName: 'tag',
      model: Tag,
      datas: TagData(),
    },
  ];
  const refIdsMap = {};
  for (const item of insertDatas) {
    await removeCollection(item.model, item.collectionName);
    const result = await initCollection(
      item.model,
      item.datas,
      item.collectionName,
    );
    refIdsMap[result.collection] = result.ids;
  }

  // !!! resource needs ref key from ..... _ids
  const resourceDatas = ResourceData(refIdsMap);
  await removeCollection(Resource, 'resource');
  await initCollection(Resource, resourceDatas, 'resource');
  return true;
}

function removeCollection(model, collectionName) {
  return model
    .remove()
    .then(() => {
      log.info('------->>>' + collectionName + '<<<-----remove ok!');
    })
    .catch(err => {
      log.info('!!!<<<->>>' + collectionName + '<<<---remove failed!');
      throw err;
    });
}

function initCollection(model, datas, collectionName) {
  return model
    .insertMany(datas)
    .then(results => {
      log.info('------->>>' + collectionName + '<<<-----init ok!');
      const idsMap = {
        collection: collectionName,
        ids: [],
      };
      results.forEach(item => {
        idsMap.ids.push(item.id);
      });
      return idsMap;
    })
    .catch(err => {
      log.info('!!!<<<->>>' + collectionName + '<<<---init failed!');
      throw err;
    });
}

execInitDatabase()
  .then(() => {
    log.info('========================================');
    log.info('Init database success!!');
    process.exit(0);
  })
  .catch(err => {
    throw err;
  });
