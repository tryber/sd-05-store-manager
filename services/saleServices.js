const { ObjectId } = require('mongodb');
const model = require('../models/salesModel');
const productModel = require('../models/productsModel');

const getAll = async () => model.getAllSales();

const getById = async (id) => {
  if (!id) {
    throw {
      code: 'not_found', message: 'Sale not found',
    };
  }
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
  // criar um map com todos itens e testá-los
  if (!itensSold.productId || !itensSold.quantity) {
    throw {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    };
  }
  if (itensSold.quantity <= 0) {
    throw {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    };
  }
  if (!ObjectId.isValid(itensSold.productId)) {
    throw {
      code: 'invalid_data', message: 'Wrong product ID or invalid quantity',
    };
  }
  if (typeof itensSold.quantity !== 'number' || !Number.isInteger(itensSold.quantity)) {
    throw {
      code: 'invalid_data',
      message: '"Wrong product ID or invalid quantity',
    };
  }
  // const saleExists = await model.getSalesById(id);
  // if (saleExists) {
  //   throw {
  //     code: 'invalid_data',
  //     message: 'Wrong product ID or invalid quantity',
  //   };
  // }
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
      message: '"Wrong product ID or invalid quantity',
    };
  }
  const saleExists = await model.getSalesById(id);
  if (!saleExists) {
    throw {
      code: 'invalid_data',
      message: '"Wrong product ID or invalid quantity',
    };
  }
  const productExists = await productModel.getProductsById(productId);
  if (!productExists) {
    throw {
      code: 'invalid_data',
      message: '"Wrong product ID or invalid quantity',
    };
  }
  await model.updateProducts(id, productId, quantity);

  return {
    _id: id,
    itensSold: [
      {productId, quantity},
  ]};
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

  const { _id, itensSold } = await model.getSalesById(id);

  if (!_id || !itensSold) {
    throw {
      code: 'invalid_data', message: 'Wrong sale ID format',
    };
  }

  await model.excludeSales(id);

  return { _id, itensSold };
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  exclude,
};
