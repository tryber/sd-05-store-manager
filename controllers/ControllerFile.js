const { getProducts, addedProduct, productByIdDocument } = require('../services/ServiceFile');

// const result = list('products', beta()).then((res) => res);
const listProductsOutput = async (collection) => {
  const result = await getProducts(collection);
  return result;
};

const addProductOutput = async (collection, name, quantity) => {
  const result = await addedProduct(collection, name, quantity);
  return result;
};

const productByIdOutput = async (collection, id) => {
  const result = await productByIdDocument(collection, id);
  return result;
};

module.exports = {
  listProductsOutput,
  addProductOutput,
  productByIdOutput,
};
