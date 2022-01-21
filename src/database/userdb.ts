import {Schema,Document,model,Model} from 'mongoose';

export interface IUser extends Document {
    currentProfit: number;
    currentLots: number;
  }
  
const UserSchema: Schema = new Schema({
    currentProfit: { type: Number, required: true },
    currentLots: { type: Number, required: true },
  });

export const User: Model<IUser> = model('User', UserSchema);