const { list, addProduct } = require('../services/ServiceFile');
const getDataBase = require('../models/ModelFile');

// const result = list('products', beta()).then((res) => res);
const output = async () => {
  const result = await list(getDataBase(), 'products');
  return result;
};

const addProductOutput = async (name, quantity) => {
  const result = await addProduct(getDataBase(), 'products', name, quantity);
  return result;
};

module.exports = {
  output,
  addProductOutput,
};
