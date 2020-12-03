const { ObjectId } = require('mongodb');
const productsModel = require('../models/productsModel');

const create = async (name, quantity) => {
  if (!name || name.length < 5) {
    throw {
      code: 'invalid_data',
      message: '"name" length must be at least 5 characters long',
    };
  }
  if (quantity < 1) {
    throw {
      code: 'invalid_data',
      message: '"quantity" must be larger than or equal to 1',
    };
  }
  if (!Number.isInteger(quantity)) {
    throw {
      code: 'invalid_data',
      message: '"quantity" must be a number',
    };
  }
  const productExist = await productsModel.findName(name);
  if (productExist) {
    throw {
      code: 'invalid_data',
      message: 'Product already exists',
    };
  }
  return productsModel.create(name, quantity);
};

const AllProducts = async () => productsModel.AllProducts();

const findId = async (id) => {
  if (!ObjectId.isValid(id)) {
    throw {
      code: 'invalid_data',
      message: 'Wrong id format',
    };
  }
  return productsModel.findId(id);
};

const updateProduct = async (id, name, quantity) => {
  if (name.length < 5) {
    throw {
      code: 'invalid_data',
      message: '"name" length must be at least 5 characters long',
    };
  }
  if (quantity < 1) {
    throw {
      code: 'invalid_data',
      message: '"quantity" must be larger than or equal to 1',
    };
  }
  if (!Number.isInteger(quantity)) {
    throw {
      code: 'invalid_data',
      message: '"quantity" must be a number',
    };
  }
  return productsModel.updateProduct(id, name, quantity);
};

const deleteProduct = async (id) => {
  if (!ObjectId.isValid(id)) {
    throw {
      code: 'invalid_data',
      message: 'Wrong id format',
    };
  }
  return productsModel.deleteProduct(id);
};

const updateSales = async (itensSold) =>
  itensSold.forEach(async (itemSold) => {
    console.log(`testando o for ${itemSold}`);

    const itemBD = await productsModel.findId(itemSold.productId);

    if (itemBD.quantity < itemSold.quantity) {
      throw {
        code: 'stock_problem',
        message: 'Such amount is not permitted to sell',
      };
    }
    await productsModel.updateSales(itemSold.prductId, itemSold.quantity);
  });

module.exports = {
  create,
  AllProducts,
  findId,
  updateProduct,
  deleteProduct,
  updateSales,
};
