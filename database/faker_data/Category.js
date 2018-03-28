const mongoose = require('mongoose');
exports.data = function() {
    let datas = [];
    datas.push({
        _id: mongoose.Types.ObjectId('5ab4fbb47c162e2ffff8a55e'),
        parentId: null,
        name: '古琴文化',
        nameEn: 'guqinwenhua',
        description: '',
        sort: 1,
        viewCount: 0,
        active: true,
        dateCreated: new Date(),
        dateCreated: new Date()
    });
    datas.push({
        _id: mongoose.Types.ObjectId('5ab4fbb47c162e2ffff8a55c'),
        parentId: null,
        name: '古琴教学',
        nameEn: 'guqinjiaoxue',
        description: '',
        sort: 2,
        viewCount: 0,
        active: true,
        dateCreated: new Date(),
        dateCreated: new Date()
    });
    datas.push({
        _id: mongoose.Types.ObjectId('5ab4fbb47c162e2ffff8a55d'),
        parentId: null,
        name: '古琴资讯',
        nameEn: 'guqinzixun',
        description: '',
        sort: 5,
        viewCount: 0,
        active: true,
        dateCreated: new Date(),
        dateCreated: new Date()
    });
    datas.push({
        _id: mongoose.Types.ObjectId('5ab4fbb47c162e2ffff8a55f'),
        parentId: null,
        name: '古琴名家',
        nameEn: 'guqinmingjia',
        description: '',
        sort: 3,
        viewCount: 0,
        active: true,
        dateCreated: new Date(),
        dateCreated: new Date()
    });
    datas.push({
        _id: mongoose.Types.ObjectId('5ab4fbb47c162e2ffff8a550'),
        parentId: null,
        name: '古琴选购',
        nameEn: 'guqinxuangou',
        description: '',
        sort: 6,
        viewCount: 0,
        active: true,
        dateCreated: new Date(),
        dateCreated: new Date()
    });
    datas.push({
        _id: mongoose.Types.ObjectId('5ab4fbb47c162e2ffff8a551'),
        parentId: null,
        name: '琴谱',
        nameEn: 'qinpu',
        description: '',
        sort: 4,
        viewCount: 0,
        active: true,
        dateCreated: new Date(),
        dateCreated: new Date()
    });
    return datas;
}
