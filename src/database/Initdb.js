const mongoose = require('mongoose');
const MongodbManager = require('../system/MongodbManager');
const User = require('../app_model/User');
const UserFaker = require('./faker_data/User');
const Category = require('../app_model/Category');
const CategoryFaker = require('./faker_data/Category');
const Tag = require('../app_model/Tag');
const TagFaker = require('./faker_data/Tag');
const Resource = require('../app_model/Resource');
const ResourceFaker = require('./faker_data/Resource');

async function execInitDatabase() {
  await MongodbManager.connectMongodbServer();
  const insertDatas = [
    {
      collectionName: 'user',
      model: User,
      datas: UserFaker.data(),
    },
    {
      collectionName: 'category',
      model: Category,
      datas: CategoryFaker.data(),
    },
    {
      collectionName: 'tag',
      model: Tag,
      datas: TagFaker.data(),
    },
  ];
  let refIdsMap = {};
  for (let item of insertDatas) {
    await removeCollection(item.model, item.collectionName);
    let result = await initCollection(
      item.model,
      item.datas,
      item.collectionName,
    );
    refIdsMap[result.collection] = result.ids;
  }

  // !!! resource needs ref key from ..... _ids
  let resourceDatas = ResourceFaker.data(refIdsMap);
  await removeCollection(Resource, 'resource');
  await initCollection(Resource, resourceDatas, 'resource');
  return true;
}

function removeCollection(model, collectionName) {
  return model
    .remove()
    .then(() => {
      console.log('------->>>' + collectionName + '<<<-----remove ok!');
    })
    .catch(function(err) {
      console.log('!!!<<<->>>' + collectionName + '<<<---remove failed!');
      throw err;
    });
}

function initCollection(model, datas, collectionName) {
  return model
    .insertMany(datas)
    .then(results => {
      console.log('------->>>' + collectionName + '<<<-----init ok!');
      let idsMap = {
        collection: collectionName,
        ids: [],
      };
      for (let i = 0; i < results.length; i++) {
        idsMap.ids.push(results[i].id);
      }
      return idsMap;
    })
    .catch(err => {
      console.log('!!!<<<->>>' + collectionName + '<<<---init failed!');
      throw err;
    });
}

execInitDatabase()
  .then(() => {
    console.log('========================================');
    console.log('Congratulations! init database success!!');
    process.exit(0);
  })
  .catch(err => {
    throw err;
  });
