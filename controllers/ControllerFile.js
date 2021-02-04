const {
  getProducts,
  addedProduct,
  productByIdDocument,
  deleteProduct,
  addSales,
  saleByIdDocument,
  updateSaleByIdDocument,
  deleteSale,
} = require('../services/ServiceFile');

// products controllers:

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

const deleteProductControl = async (collection, id) => {
  deleteProduct(collection, id);
};

// sales controllers:

const addSalesOutput = async (collection, itensSold) =>
  addSales(collection, itensSold);

const saleByIdOutput = async (collection, id) =>
  saleByIdDocument(collection, id);

const updateSaleById = async (collection, id, arr) =>
  updateSaleByIdDocument(collection, id, arr);

const deleteSaleControl = async (collection, id) => {
  deleteSale(collection, id);
};

module.exports = {
  listProductsOutput,
  addProductOutput,
  productByIdOutput,
  deleteProductControl,
  addSalesOutput,
  saleByIdOutput,
  updateSaleById,
  deleteSaleControl,
};
