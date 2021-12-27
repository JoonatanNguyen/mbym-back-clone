import mongoose from 'mongoose';

export type User = {
  _id: mongoose.Types.ObjectId;
  thirdPartyLoginProvider?: string;
  signinProvider: string;
  signinProviderUserId: string;
  name?: string;
  email?: string;
  blockedAt?: Date;
  accessToken?: string;
  createdAt?: Date;
  updatedAt?: Date;
};
