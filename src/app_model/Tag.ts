import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export interface ITag extends mongoose.Document {
  name: string;
  nameEn: string;
  description: string;
  viewCount: number;
  active: boolean;
  dateCreated: Date;
  dateModified: Date;
}

const TagSchema = new Schema(
  {
    name: String,
    nameEn: String,
    description: String,
    viewCount: Number,
    active: { type: Boolean, default: true },
    dateCreated: { type: Date, default: Date.now },
    dateModified: { type: Date, default: Date.now },
  },
  { collection: 'tag' },
);

export const Comment: mongoose.Model<ITag> = mongoose.model<ITag>(
  'Tag',
  TagSchema,
);
