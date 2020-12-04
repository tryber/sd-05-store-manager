const { ObjectId } = require('mongodb');
const connection = require('./connection');
// const productsModel = require('./productsModel');

const findByIdSale = async (id) => {
  const db = await connection('sales');
  if (!ObjectId.isValid(id)) return null;

  const resultId = await db.findOne(ObjectId(id));
  return resultId;
};

const createSale = async (itensSold) => {
  const db = await connection('sales');
  const result = await db.insertOne({ itensSold });
  return ({ _id: result.insertedId, itensSold });
};

const findAllSale = async () => {
  const db = await connection('sales');
  const result = await db.find().toArray();
  return result;
};

const saleUpdate = async (id, product) => {
  const db = await connection('sales');
  const result = await db.updateOne({ _id: ObjectId(id) }, { $set: { itensSold: product } });
  return result;
};

const deleteSale = async (id) => {
  const db = await connection('sales');
  const excludeSale = db.findOne({ _id: ObjectId(id) });
  await db.deleteOne({ _id: ObjectId(id) });
  return excludeSale;
};

module.exports = {
  findByIdSale,
  createSale,
  findAllSale,
  deleteSale,
  saleUpdate,
};
