import mongoose, { Document } from 'mongoose';

import { Product } from '../types/Type';

class ProductRepository {
  Product: mongoose.Model<Document>;
  constructor() {}

  async getProductsShownInDashboard() {
    try {
      const response = await this.Product.find({
        shownInDashboard: true
      }).lean();

      return response as Product[];
    } catch (error) {
      throw error;
    }
  }

  async getProductByCode(code: string) {
    try {
      const response = await this.Product.findOne({ code }).lean();

      return response as Product;
    } catch (error) {
      throw error;
    }
  }

  async getProductSoldIndividually() {
    try {
      const response = await this.Product.find({
        $or: [{ isOnlySoldInSet: undefined }, { isOnlySoldInSet: false }]
      }).lean();

      return response as Product[];
    } catch (error) {
      throw error;
    }
  }

  async getProductsByIds(ids: mongoose.Types.ObjectId[]) {
    try {
      const response = await this.Product.find({
        _id: { $in: ids }
      }).lean();

      return response as Product[];
    } catch (error) {
      throw error;
    }
  }
}

export default ProductRepository;
