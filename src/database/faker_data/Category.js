const Faker = require('faker');
exports.data = function() {
  let datas = [];
  datas.push({
    parentId: null,
    name: '古琴文化',
    nameEn: 'guqinwenhua',
    description: Faker.random.words(30),
    sort: 1,
    viewCount: Faker.random.number(500),
    active: true,
    dateCreated: new Date(),
    dateCreated: new Date(),
  });
  datas.push({
    parentId: null,
    name: '古琴教学',
    nameEn: 'guqinjiaoxue',
    description: Faker.random.words(40),
    sort: 2,
    viewCount: Faker.random.number(500),
    active: true,
    dateCreated: new Date(),
    dateCreated: new Date(),
  });
  datas.push({
    parentId: null,
    name: '古琴资讯',
    nameEn: 'guqinzixun',
    description: Faker.random.words(20),
    sort: 5,
    viewCount: Faker.random.number(500),
    active: true,
    dateCreated: new Date(),
    dateCreated: new Date(),
  });
  datas.push({
    parentId: null,
    name: '古琴名家',
    nameEn: 'guqinmingjia',
    description: Faker.random.words(50),
    sort: 3,
    viewCount: Faker.random.number(500),
    active: true,
    dateCreated: new Date(),
    dateCreated: new Date(),
  });
  datas.push({
    parentId: null,
    name: '古琴选购',
    nameEn: 'guqinxuangou',
    description: Faker.random.words(30),
    sort: 6,
    viewCount: Faker.random.number(500),
    active: true,
    dateCreated: new Date(),
    dateCreated: new Date(),
  });
  datas.push({
    parentId: null,
    name: '琴谱',
    nameEn: 'qinpu',
    description: Faker.random.words(40),
    sort: 4,
    viewCount: Faker.random.number(500),
    active: true,
    dateCreated: new Date(),
    dateCreated: new Date(),
  });
  return datas;
};
