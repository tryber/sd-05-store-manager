const {
  listProducts,
  addProduct,
  getProductById,
  deleteProductById,
  addSalesToDb,
  listSales,
  getSaleById,
  updateSale,
  deleteSaleById,
} = require('../models/ModelFile');

// products services functions:

const getItem = (itemData) => {
  const x = itemData;
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
  const x = saleData;
  // console.log(x);
  return x;
};

const addSales = async (collection, itensSold) =>
  addSalesToDb(collection, itensSold)
    .then((item) =>
      getSale({ _id: item.insertedId, itensSold }));

// getSales feito com ajuda do especialista Critiano Cunha

const getSales = async (collection) =>
  listSales(collection)
    .then((item) =>
      ({ sales: item.map(({ _id, sale }) => ({ _id, itensSold: sale })) }));

const saleByIdDocument = async (collection, id) =>
  getSaleById(collection, id);

const updateSaleByIdDocument = async (collection, id, arr) =>
  updateSale(collection, id, arr);

const deleteSale = async (collection, id) =>
  deleteSaleById(collection, id);

module.exports = {
  getProducts,
  addedProduct,
  productByIdDocument,
  deleteProduct,
  addSales,
  getSales,
  saleByIdDocument,
  updateSaleByIdDocument,
  deleteSale,
};
