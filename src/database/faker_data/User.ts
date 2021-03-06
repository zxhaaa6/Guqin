import * as Faker from 'faker';

const count = 8;
const fields = {
  name: () => Faker.name.firstName(),
  email: () => Faker.internet.email(),
  password: () => Faker.internet.password(),
  phone: () => Faker.phone.phoneNumber(),
  age: () => Faker.random.number({ min: 5, max: 80 }),
  country: () => Faker.address.country(),
  province: () => Faker.address.country(),
  city: () => Faker.address.city(),
  active: () => {
    return true;
  },
  dateCreated: () => Faker.date.recent(20),
  dateModified: () => Faker.date.recent(2),
};

export const data = () =>
  [...Array(count)].map(() => {
    const user = {};
    for (const key in fields) {
      if (fields.hasOwnProperty(key)) {
        user[key] = fields[key]();
      }
    }
    return user;
  });
