const { getProducts, addedProduct } = require('../services/ServiceFile');

// const result = list('products', beta()).then((res) => res);
const listProductsOutput = async (collection) => {
  const result = await getProducts(collection);
  return result;
};

const addProductOutput = async (collection, name, quantity) => {
  const result = await addedProduct(collection, name, quantity);
  return result;
};

module.exports = {
  listProductsOutput,
  addProductOutput,
};
