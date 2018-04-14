const Faker = require('faker');
const Util = require('../../util/Util');

const count = 30;
const fields = {
    categoryLaId: () => { return null },
    categoryLbId: () => { return null },
    tagId: () => { return [] },
    title: () => Faker.random.words(3),
    description: () => Faker.random.words(20),
    text: () => Faker.random.words(500),
    authorId: () => { return null },
    viewCount: () => Faker.random.number(300),
    active: () => { return true },
    dateCreated: () => Faker.date.recent(20),
    dateModified: () => Faker.date.recent(2)
};

exports.data = function(refIdsMap) {
    return [...Array(count)].map(() => {
        const resource = {};
        for (let key in fields) {
            if (key === 'categoryLaId') {
                resource[key] = refIdsMap.category[Util.genRandom(0, 5)];
            } else if (key === 'tagId') {
                resource[key] = [refIdsMap.tag[Util.genRandom(0, 1)]];
            } else if (key === 'authorId') {
                resource[key] = refIdsMap.user[Util.genRandom(0, 7)];
            } else {
                resource[key] = fields[key]();
            }
        }
        return resource;
    });
}