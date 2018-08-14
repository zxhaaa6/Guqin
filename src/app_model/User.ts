import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export interface IUser extends mongoose.Document {
  username: string;
  password: string;
  email: string;
  phone: string;
  wechatId: string;
  alipayId: string;
  qqId: string;
  age: number;
  country: string;
  province: string;
  city: string;
  picId: string;
  active: boolean;
  dateCreated: Date;
  dateModified: Date;
}

const UserSchema = new Schema(
  {
    username: String,
    password: String,
    email: String,
    phone: String,
    wechatId: String,
    alipayId: String,
    qqId: String,
    age: Number,
    country: String,
    province: String,
    city: String,
    picId: String,
    active: { type: Boolean, default: true },
    dateCreated: { type: Date, default: Date.now },
    dateModified: { type: Date, default: Date.now },
  },
  { collection: 'user' },
);

UserSchema.index({
  email: 1,
  phone: 1,
});

export const User: mongoose.Model<IUser> = mongoose.model<IUser>(
  'User',
  UserSchema,
);
