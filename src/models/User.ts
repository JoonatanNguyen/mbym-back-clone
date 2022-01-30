import 'reflect-metadata';
import mongoose from 'mongoose';
import moment from 'moment';
import { Service } from 'typedi';

const userSchema = new mongoose.Schema(
  {
    signinProvider: {
      type: String,
      required: true
    },
    signinProviderUserId: {
      type: String,
      required: true
    },
    name: {
      type: String
    },
    email: {
      type: String
    },
    blockedAt: {
      type: Date
    }
  },
  {
    timestamps: { currentTime: () => moment().toDate() as any }
  }
);

export const model = mongoose.model('user', userSchema);
module.exports = model;
export default model;
