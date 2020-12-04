const { ObjectId } = require('mongodb');
const { salesEnums } = require('../enumerators');
const SalesModel = require('../models/Sales.models');
// const { getProducts } = require('../models/Products.models');

const isItemValid = (item) => {
  if (!Number(item.quantity) || item.quantity < 1) {
    return salesEnums.error.isInvalid;
  }
  if (!ObjectId.isValid(item.productId)) {
    return salesEnums.error.isInvalid;
  }
  return item;
};

const isValid = async (items) => {
  let data = [];
  // const promises = items.map((item) => getProducts(item.productId));
  // const idExists = await Promise.all(promises);
  // idExists.forEach((item) => console.log(item));
  for (let prod = 0; prod < items.length; prod += 1) {
    const product = items[prod];
    const item = isItemValid(product);
    if (item.err) {
      data = item;
      return item;
    }
    data.push(product);
  }

  return data;
};

const getSales = async (id) => {
  if (id && !ObjectId.isValid(id)) {
    return salesEnums.error.notFound;
  }
  const allSales = await SalesModel.getSales(id);
  return allSales;
};

const createSale = async (items) => {
  const saleValid = await isValid(items);
  if (saleValid.err) return saleValid;
  const newSale = await SalesModel.createSale(items);
  return newSale;
};

const updateSale = async (id, itensSold) => {
  const itens = await isValid(itensSold);
  console.log(itens);
  if (itens.err) return itens;
  const updatedItens = await SalesModel.updateSale(id, itensSold);
  return updatedItens;
};

module.exports = {
  getSales,
  createSale,
  updateSale,
};
