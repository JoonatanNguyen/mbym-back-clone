import mongoose, { Document } from 'mongoose';
import { ContainerInstance } from 'typedi';

import LoggerService from '../services/LoggerService';
import { User } from '../types/Type';
import UserModel from '../models/User';

class UserRepository {
  loggerService: LoggerService;
  User: mongoose.Model<Document>;
  constructor() {}

  async test() {
    console.log('hello there');
  }

  async createUser(user: {
    signinProviderUserId: string;
    signinProvider: string;
    name: string;
    email: string;
  }) {
    try {
      return await UserModel.create(user);
    } catch (error) {
      throw error;
    }
  }
}

export default UserRepository;
