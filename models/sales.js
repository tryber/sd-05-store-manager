const { ObjectId } = require('mongodb');
// const connection = require('./connection');
const getCollection = require('./connection');
// const productsModel = require('./products');
const getSaleById = async (id) => {
  const result = await getCollection('sales').then((sale) => sale.findOne({ _id: ObjectId(id) }));
  return result;
};

const getAllSales = async () => {
  const result = await getCollection('sales').then((sales) => sales.find().toArray());
  return { sales: result };
};

const registerSale = async (itensSold) => {
  const { productId, quantity } = itensSold;
  await getCollection('products').then((products) => products.updateOne(
    { _id: ObjectId(productId) },
    { $set: { quantity: { $inc: ['quantity', -quantity] } } },
  ));
  const sale = await getCollection('sales')
    .then((sales) => sales.insertOne({ itensSold }))
    .then((result) => result.ops[0]);
  return sale;
};

const editSale = async (saleId, saleData) => {
  // const { productId, quantity } = saleData[0];
  // await getCollection('products').then((products) =>
  //   products.updateOne(
  //     { _id: ObjectId(productId) },
  //     { $set: { quantity: { $inc: ['quantity', -quantity] } } },
  //   ),
  // );
  await getCollection('sales').then((sales) => sales.updateOne(
    { _id: ObjectId(saleId) }, { $set: { itensSold: saleData } },
  ));
  return getCollection('sales').then((sales) => sales.findOne({ _id: ObjectId(saleId) }));
};

const deleteSale = async (saleId) => {
  const deletedSale = await getSaleById(saleId);
  await getCollection('sales').then((sales) => sales.deleteOne({ _id: ObjectId(saleId) }));
  return deletedSale;
};

module.exports = {
  getSaleById,
  getAllSales,
  registerSale,
  deleteSale,
  editSale,
};
