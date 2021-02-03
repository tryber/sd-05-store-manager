const {
  listProducts,
  addProduct,
  getProductById,
  deleteProductById,
  addSalesToDb,
} = require('../models/ModelFile');

// products services functions:

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

const deleteProduct = async (collection, id) =>
  deleteProductById(collection, id);

// sales services functions:

const getSale = (saleData) => {
  let x = { _id: '', itensSold: '' };
  x = saleData;
  return x;
};

const addSales = async (collection, itensSold) =>
  addSalesToDb(collection, itensSold)
    .then((item) =>
      getSale({ _id: item.insertedId, itensSold }));

module.exports = {
  getProducts,
  addedProduct,
  productByIdDocument,
  deleteProduct,
  addSales,
};
