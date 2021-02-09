const { ObjectId } = require('mongodb');
const model = require('../models/sales');
const productModel = require('../models/products');

const getAll = async () => model.getAllSales();

const getById = async (id) => {
  if (!ObjectId.isValid(id)) {
    throw {
      code: 'not_found', message: 'Sale not found',
    };
  }

  const sales = await model.getSalesById(id);

  if (!sales) {
    throw {
      code: 'not_found',
      message: 'Sale not found',
    };
  }

  return sales;
};

const create = async (itensSold) => {
  if (!itensSold) {
    throw {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    };
  }

  itensSold.forEach((p) => {
    if (!ObjectId.isValid(p.productId) || p.quantity <= 0 || typeof p.quantity !== 'number') {
      throw {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      };
    }
  });

  const newSale = await model.createSales(itensSold);

  return newSale;
};

const update = async (id, productId, quantity) => {
  if (!id) {
    throw {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    };
  }
  if (!ObjectId.isValid(id)) {
    throw {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    };
  }
  if (!productId || !quantity) {
    throw {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    };
  }
  if (!ObjectId.isValid(productId)) {
    throw {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    };
  }
  if (quantity <= 0) {
    throw {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    };
  }
  if (typeof quantity !== 'number' || !Number.isInteger(quantity)) {
    throw {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    };
  }
  const saleExists = await model.getSalesById(id);
  if (!saleExists) {
    throw {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    };
  }
  const productExists = await productModel.getProductsById(productId);
  if (!productExists) {
    throw {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    };
  }
  await model.updateSales(id, productId, quantity);
  const updated = {
    _id: id,
    itensSold: [
      { productId, quantity },
    ],
  };
  return updated;
};

const exclude = async (id) => {
  if (!id) {
    throw {
      code: 'invalid_data', message: 'Wrong sale ID format',
    };
  }
  if (!ObjectId.isValid(id)) {
    throw {
      code: 'invalid_data', message: 'Wrong sale ID format',
    };
  }

  const deletedSale = await model.deleteSales(id);
  console.log(deletedSale);
  if (!deletedSale) {
    throw {
      code: 'invalid_data', message: 'Wrong sale ID format',
    };
  }
  console.log(deletedSale);
  return deletedSale;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  exclude,
};
