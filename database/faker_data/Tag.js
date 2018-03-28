const Faker = require('faker');
exports.data = function() {
    let datas = [];
    datas.push({
        name: '名家专属',
        nameEn: 'mingjiazhuanshu',
        description: Faker.random.words(30),
        viewCount: Faker.random.number(500),
        active: true,
        dateCreated: new Date(),
        dateCreated: new Date()
    });
    datas.push({
        name: '精华',
        nameEn: 'jinghua',
        description: Faker.random.words(30),
        viewCount: Faker.random.number(500),
        active: true,
        dateCreated: new Date(),
        dateCreated: new Date()
    });
    return datas;
}
