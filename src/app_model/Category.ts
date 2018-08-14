import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export interface ICategory extends mongoose.Document {
  parentId: mongoose.Schema.Types.ObjectId;
  name: string;
  nameEn: string;
  description: string;
  sort: number;
  viewCount: number;
  active: boolean;
  dateCreated: Date;
  dateModified: Date;
}

const CategorySchema = new Schema(
  {
    parentId: { type: Schema.Types.ObjectId, ref: 'category' },
    name: String,
    nameEn: String,
    description: String,
    sort: Number,
    viewCount: Number,
    active: { type: Boolean, default: true },
    dateCreated: { type: Date, default: Date.now },
    dateModified: { type: Date, default: Date.now },
  },
  { collection: 'category' },
);

CategorySchema.index({
  parentId: 1,
});

export const Category: mongoose.Model<ICategory> = mongoose.model<ICategory>(
  'Category',
  CategorySchema,
);
