const { ObjectId } = require('mongodb');
const salesModels = require('../models/salesModel');
const productModels = require('../models/productsModel');

const create = async (saleList) => {
  const checkSales = saleList.map(async (sale) => {
    const validProduct = ObjectId.isValid(sale.productId);

    if (!validProduct) {
      throw {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      };
    }

    const productExists = await productModels.getById(sale.productId);

    if (!productExists || sale.quantity <= 0 || typeof sale.quantity !== 'number') {
      throw {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      };
    }

    return saleList;
  });

  await Promise.all(checkSales);

  return salesModels.insertSale(saleList);
};

module.exports = {
  create,
};
