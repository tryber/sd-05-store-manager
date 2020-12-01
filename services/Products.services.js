const { ObjectId } = require('mongodb');
const Products = require('../models/Products.models');
const prodError = require('../enumerators/Products.enums');

const isValid = (name, quantity) => {
  if (!name || typeof name !== 'string' || name.length < 4) {
    return { error: prodError.error.smallName };
  }
  if (!quantity || quantity < 1) {
    return { error: prodError.error.invalidQuantity };
  }
  if (!Number(quantity)) return { error: prodError.error.notNumber };
  return true;
};

const create = async (name, quantity) => {
  const productValid = isValid(name, quantity);
  if (productValid.error) return productValid;
  const exists = await Products.getProductByName(name);
  if (exists) {
    return { error: prodError.error.exists };
  }
  const newProduct = await Products.create(name, quantity);
  return newProduct;
};

const getAllProducts = async (id) => {
  if (id && !ObjectId.isValid(id)) return { error: prodError.error.invalidId };
  const allProducts = await Products.getProducts(id);
  return allProducts;
};

module.exports = { create, getAllProducts };
