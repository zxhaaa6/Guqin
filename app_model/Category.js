const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    parentId: Schema.Types.ObjectId,
    name: String,
    nameEn: String,
    description: String,
    active: Boolean,
    dateCreated: { type: Date, default: Date.now },
    dateModified: { type: Date, default: Date.now }
}, { collection: 'category' });

// CategorySchema.index({
//     active: 1
// });

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;