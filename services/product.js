const { ObjectId } = require('mongodb');
const { productsModel } = require('../models');
const productValidate = require('../utils/productValidate');

const getAll = async () => productsModel.getAllProducts();

const getById = async (id) => {
  const err = { code: 'invalid_data' };
  if (!ObjectId.isValid(id)) {
    err.message = 'Wrong id format';
    throw err;
  }
  const product = await productsModel.getProductById(id);
  return product;
};

const create = async ({ name, quantity }) => {
  const err = { code: 'invalid_data' };
  productValidate(name, quantity);
  const productAlreadyExists = await productsModel.getProductByName(name);
  if (productAlreadyExists) {
    err.message = 'Product already exists';
    throw err;
  }
  const product = await productsModel.createProduct({ name, quantity });
  return product;
};

const edit = async (id, name, quantity) => {
  productValidate(name, quantity);
  await productsModel.updateProduct(id, name, quantity);
  const updatedProduct = await getById(id);
  return updatedProduct;
};

const deleteProduct = async (id) => {
  await getById(id);
  await productsModel.deleteAProduct(id);
};

module.exports = { getAll, getById, create, edit, deleteProduct };
