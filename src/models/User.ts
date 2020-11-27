import { model, Schema } from "mongoose";

import { IUser } from "./../types/user";

const userSchema: Schema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  pwdHash: {
    type: String,
    required: false
  },
  userDetails: {
    type: Object,
    default: {}
  }
}, { timestamps: true });

export default model<IUser>('User', userSchema);