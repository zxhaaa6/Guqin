import * as Faker from 'faker';

export const data = () => [
  {
    name: '名家专属',
    nameEn: 'mingjiazhuanshu',
    description: Faker.random.words(30),
    viewCount: Faker.random.number(500),
    active: true,
    dateCreated: new Date(),
    dateModified: new Date(),
  },
  {
    name: '精华',
    nameEn: 'jinghua',
    description: Faker.random.words(30),
    viewCount: Faker.random.number(500),
    active: true,
    dateCreated: new Date(),
    dateModified: new Date(),
  },
];
