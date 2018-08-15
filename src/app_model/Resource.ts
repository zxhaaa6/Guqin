import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export interface IResource extends mongoose.Document {
  categoryLaId: mongoose.Schema.Types.ObjectId;
  categoryLbId: mongoose.Schema.Types.ObjectId;
  tagId: mongoose.Schema.Types.ObjectId[];
  title: string;
  description: string;
  text: string;
  authorId: mongoose.Schema.Types.ObjectId;
  viewCount: number;
  active: boolean;
  dateCreated: Date;
  dateModified: Date;
}

const ResourceSchema = new Schema(
  {
    categoryLaId: { type: Schema.Types.ObjectId, ref: 'category' },
    categoryLbId: { type: Schema.Types.ObjectId, ref: 'category' },
    tagId: [{ type: Schema.Types.ObjectId, ref: 'tag' }],
    title: String,
    description: String,
    text: String,
    authorId: { type: Schema.Types.ObjectId, ref: 'user' },
    viewCount: Number,
    active: { type: Boolean, default: true },
    dateCreated: { type: Date, default: Date.now },
    dateModified: { type: Date, default: Date.now },
  },
  { collection: 'resource' },
);

ResourceSchema.index({
  categoryLaId: 1,
  categoryLbId: 1,
  tagId: 1,
  authorId: 1,
});

export const Resource: mongoose.Model<IResource> = mongoose.model<IResource>(
  'Resource',
  ResourceSchema,
);
