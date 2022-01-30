import faker from 'faker';
import mongoose from 'mongoose';
import { mockModel } from '../../src/models/Product';

import { connectDatabase, clearDatabase, closeDatabase } from '../database';

const mockProducts = [
  {
    code: faker.commerce.product(),
    price: faker.commerce.price(),
    images: [
      {
        data: faker.image.image()
      }
    ],
    showInDashboard: true,
    isOnlySoldInSet: true
  },
  {
    code: faker.commerce.product(),
    price: faker.commerce.price(),
    images: [
      {
        data: faker.image.image()
      }
    ]
  },
  {
    code: faker.commerce.product(),
    price: faker.commerce.price(),
    images: [
      {
        data: faker.image.image()
      }
    ],
    isOnlySoldInSet: true
  },
  {
    code: faker.commerce.product(),
    price: faker.commerce.price(),
    images: [
      {
        data: faker.image.image()
      }
    ],
    showInDashboard: true,
    isOnlySoldInSet: false
  }
];
let productIds: mongoose.Types.ObjectId[] = [];

describe('Product repository', () => {
  beforeAll(async done => {
    await connectDatabase();
    done();
  });

  beforeEach(async done => {
    const MockProduct = mockModel;
    const addProductsPromises: Promise<void>[] = [];

    mockProducts.map(async product => {
      addProductsPromises.push(
        new Promise<void>(async resolve => {
          try {
            new MockProduct({
              ...product
            })
              .save()
              .then(product => {
                productIds.push(product._id);
                resolve();
              });
          } catch (error) {
            console.log(error);
          }
        })
      );
    });
    await Promise.all(addProductsPromises);

    done();
  });

  afterEach(async done => {
    await clearDatabase();
    productIds = [];

    done();
  });

  afterAll(async done => {
    await closeDatabase();
    done();
  });

  describe('Get products in dashboard', () => {
    test('Expect only products set to be shown in dashboard are returned', async () => {
      const unitUnderTest = new ProductRespository();
      const productsShownInDashboard =
        await unitUnderTest.getProductsShownInDashboard();

      expect(productsShownInDashboard.length).toEqual(
        mockProducts.filter(product => product.showInDashboard).length
      );
      productsShownInDashboard.map(({ shownInDashboard }) => {
        expect(shownInDashboard).toBeTruthy();
      });
    });

    test('When mongoose throws error, expect product show in dashboard are not returned and errors are thrown', async () => {
      const logErrorFunctionMock = jest.fn();
      const unitUnderTest = new ProductRespository();
      try {
        await unitUnderTest.getProductsShownInDashboard();
      } catch (error) {
        logErrorFunctionMock();
      }
      expect(logErrorFunctionMock).toBeCalledTimes(1);
    });
  });

  describe('Get products by code', () => {
    test('Expect one correct product with matching code is returned', async () => {
      const { code: mockProductcode } = mockProducts[0];
      const unitUnderTest = new ProductRepository();

      const product = await unitUnderTest.getProductByCode(mockProductcode);

      expect(product.code).toEqual(mockProductcode);
    });

    test('When mongoose thows error, expect product with matching code is not returned and errors are thrown', async () => {
      const logErrorFunctionMock = jest.fn();
      const unitUnderTest = new ProductRepository();
      try {
        await unitUnderTest.getProductByCode(mockProducts[0].code);
      } catch (error) {
        logErrorFunctionMock();
      }

      expect(logErrorFunctionMock).toBeCalledTimes(1);
    });
  });

  describe('Get product sold individually', () => {
    test('Expect only products that can be sold individually are returned', async () => {
      const unitUnderTest = new ProductRepository();

      const productsSoldIndividually =
        await unitUnderTest.getProductSoldIndividually();

      expect(productsSoldIndividually.length).toEqual(
        mockProducts.filter(product => !product.isOnlySoldInSet).length
      );
      productsSoldIndividually.map(({ isOnlySoldInSet }) => {
        expect(isOnlySoldInSet).toBeFalsy();
      });
    });

    test('When mongoose throws error, expect product sold individually are not returned and errors are thrown', async () => {
      const logErrorFunctionMock = jest.fn();
      const unitUnderTest = new ProductRepository();

      try {
        await unitUnderTest.getProductSoldIndividually();
      } catch (error) {
        logErrorFunctionMock();
      }

      expect(logErrorFunctionMock).toBeCalledTimes(1);
    });
  });

  describe('Get products by ids', () => {
    test('Expect products with matching ids to be returned correctly', async () => {
      const [idA, idB] = productIds;
      const unitUnderTest = new ProductRepository();

      const products = await unitUnderTest.getProductsByIds([idA, idB]);

      expect(products.length).toEqual(2);
      expect(
        products[0]._id.equals(idA) || products[0]._id.equals(idB)
      ).toBeTruthy();
      expect(
        products[1]._id.equals(idA) || products[1]._id.equals(idB)
      ).toBeTruthy();
    });
  });
});
