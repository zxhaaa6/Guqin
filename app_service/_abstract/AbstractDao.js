const Promise = require("bluebird");
const log = require("log4js").getLogger("AbstractDao");
const Util = require("../../util/Util");
const mongoose = require('mongoose');
const resolve = function(res) {
    res();
};

class AbstractDao {
    constructor(model) {
        this.collection = model;
    }

    async findDocumentById(id) {
        try {
            id = mongoose.Types.ObjectId(id);
            return await this.collection.findOne({ _id: id });
        } catch (err) {
            Util.throwUpErr(log, err, 'findDocumentById');
        }
    }

}

module.exports = AbstractDao;