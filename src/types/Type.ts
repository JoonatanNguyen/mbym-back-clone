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

export type Binary = {
  _bsontype: string;
  sub_type: number;
  position: number;
  buffer: Buffer;
};

export type Image = {
  _id?: mongoose.Types.ObjectId;
  data: Binary;
  contentType: string;
};

export type Product = {
  _id: mongoose.Types.ObjectId;
  code: string;
  name?: string;
  description?: string;
  images: Image[];
  price: number;
  discount: number;
  shownInDashboard?: boolean;
  isOnlySoldInSet?: boolean;
  type?: ProductType;
};

export enum ProductType {
  Single = 'single',
  Set = 'set'
}
