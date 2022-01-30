import moment from 'moment';
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true
    },
    name: {
      type: String
    },
    description: {
      type: String
    },
    images: [
      {
        data: Buffer,
        contentType: String
      }
    ],
    price: {
      type: Number,
      required: true
    },
    discount: {
      type: Number,
      required: true,
      default: 0
    },
    showInDashboard: {
      type: Boolean
    },
    isOnlySoldInSet: {
      type: Boolean
    }
  },
  {
    timestamps: { currentTime: () => moment().toDate() }
  }
);

export const model = mongoose.model('product', productSchema);
export const mockModel = mongoose.model('mockProduct', productSchema);

export default model;
