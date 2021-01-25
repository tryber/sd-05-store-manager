const { ObjectId } = require('mongodb');
const modelProducts = require('../models/products');

const err = { code: 'invalid_data', message: '' };

const getAll = async (name) => {
  console.log('cheguei')
  const allProducts = await modelProducts.getAll(name);
  console.log(allProducts);
  return allProducts;
};

const getById = async (id, res) => {
  // console.log('services');
  console.log(id);
  if (!ObjectId.isValid(id)) {
    err.message = 'Wrong id format';
    throw res.status(422).json({ err });
  }
  const productById = await modelProducts.getById(id);
  console.log(productById);
  return productById;
};

const insertNewProduct = async (name, quantity, res) => {
  const verifyProducts = await modelProducts.getAll(name);
  if (name.length < 5) {
    err.message = '"name" length must be at least 5 characters long';
    throw res.status(422).json({ err });
  }
  if (verifyProducts) {
    err.message = 'Product already exists';
    throw res.status(422).json({ err });
  }
  if (quantity <= 0) {
    err.message = '"quantity" must be larger than or equal to 1';
    throw res.status(422).json({ err });
  }
  if (typeof quantity === 'string') {
    err.message = '"quantity" must be a number';
    throw res.status(422).json({ err });
  }
  const newProduct = await modelProducts.insertNewProduct(name, quantity);
  return newProduct;
};

module.exports = { getAll, insertNewProduct, getById };
