const { listProducts, addProduct, getProductById } = require('../models/ModelFile');

const getItem = (itemData) => {
  let x = { _id: '', name: '', quantity: '' };
  x = itemData;
  return x;
};

const getProducts = async (collection) =>
  listProducts(collection).then((products) =>
    products.map(({ _id, name, quantity }) =>
      getItem({ _id, name, quantity })));

const addedProduct = (collection, name, quantity) =>
  addProduct(collection, name, quantity)
    .then((item) =>
      getItem({ _id: item.insertedId, name, quantity }));

const productByIdDocument = async (collection, id) =>
  getProductById(collection, id);

module.exports = {
  getProducts,
  addedProduct,
  productByIdDocument,
};
