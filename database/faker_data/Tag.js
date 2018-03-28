const mongoose = require('mongoose');
exports.data = function() {
    let datas = [];
    datas.push({
        _id: mongoose.Types.ObjectId('5ab4fbb47c162e2ffff8a56b'),
        name: '名家专属',
        nameEn: 'mingjiazhuanshu',
        description: '',
        viewCount: 0,
        active: true,
        dateCreated: new Date(),
        dateCreated: new Date()
    });
    datas.push({
        _id: mongoose.Types.ObjectId('5ab4fbb47c162e2ffff8a56c'),
        name: '精华',
        nameEn: 'jinghua',
        description: '',
        viewCount: 0,
        active: true,
        dateCreated: new Date(),
        dateCreated: new Date()
    });
    return datas;
}
