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

    // const checkStock =

    const productExists = await productModels.getById(sale.productId);

    console.log(productExists);

    if (!productExists || sale.quantity <= 0 || typeof sale.quantity !== 'number') {
      throw {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      };
    }

    if (sale.quantity > productExists.quantity) {
      throw {
        code: 'stock_problem',
        message: 'Such amount is not permitted to sell',
      };
    }

    return saleList;
  });

  await Promise.all(checkSales);

  return salesModels.insertSale(saleList);
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) {
    throw {
      code: 'not_found',
      message: 'Sale not found',
    };
  }

  const findSaleById = await salesModels.getById(id);

  if (!findSaleById) {
    throw {
      code: 'not_found',
      message: 'Sale not found',
    };
  }

  return findSaleById;
};

const update = async (id, productId, quantity) => {
  const saleExists = await salesModels.getById(id);
  if (!saleExists) {
    throw {
      code: 'not_found',
      message: 'Sale not found',
    };
  }

  const validProduct = ObjectId.isValid(productId);
  if (!validProduct) {
    throw {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    };
  }

  const productExists = await productModels.getById(productId);
  console.log(productExists);
  if (!productExists || quantity <= 0 || typeof quantity !== 'number') {
    throw {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    };
  }

  if (quantity > productExists.quantity) {
    throw {
      code: 'stock_problem',
      message: 'Such amount is not permitted to sell',
    };
  }

  await salesModels.update(id, productId, quantity);
  return ({ _id: id, itensSold: [{ productId, quantity }] });
};

const exclude = async (id) => {
  if (!ObjectId.isValid(id)) {
    throw {
      code: 'invalid_data',
      message: 'Wrong sale ID format',
    };
  }
  const findSale = await salesModels.getById(id);

  if (!findSale) {
    throw {
      code: 'invalid_data',
      message: 'Wrong sale ID format',
    };
  }

  await salesModels.remove(id);

  return findSale;
};

module.exports = {
  create,
  getById,
  update,
  exclude,
};
