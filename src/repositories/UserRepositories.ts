// import { UserModel } from '../models/User'
import mongoose, { Document } from 'mongoose';
import { ContainerInstance } from 'typedi';

import LoggerService from '../services/LoggerService';
import { User } from '../types/Type';

class UserRepository {
  loggerService: LoggerService;
  User: mongoose.Model<Document>;
  constructor(container: ContainerInstance) {
    this.loggerService = container.get(LoggerService);
  }
}
