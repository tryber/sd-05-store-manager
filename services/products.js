const { ObjectId } = require('mongodb');
const { verifyName, verifyQuantity } = require('../midlewares/verify');
const modelProducts = require('../models/products');

const getAll = async () => {
  const allProducts = await modelProducts.getAll();
  console.log(allProducts);
  return allProducts;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) {
    const err = { code: 'invalid_data' };
    err.message = 'Wrong id format';
    err.status = 422;
    throw err;
  }
  const productById = await modelProducts.getById(id);
  console.log(productById);
  return productById;
};

const insertNewProduct = async (name, quantity) => {
  verifyName(name);
  verifyQuantity(quantity);
  const verifyProducts = await modelProducts.getOne(name);
  if (verifyProducts) {
    const err = { code: 'invalid_data' };
    err.message = 'Product already exists';
    err.status = 422;
    throw err;
  }
  const newProduct = await modelProducts.insertNewProduct(name, quantity);
  return newProduct;
};

const changeById = async (id, name, quantity) => {
  verifyName(name);
  verifyQuantity(quantity);
  const verifyProducts = await modelProducts.getOne(name);
  if (verifyProducts) {
    const err = { code: 'invalid_data' };
    err.message = 'Product already exists';
    err.status = 422;
    throw err;
  }
  const changedProduct = await modelProducts.changeById(id, name, quantity);
  return changedProduct;
};

module.exports = { getAll, insertNewProduct, getById, changeById };
