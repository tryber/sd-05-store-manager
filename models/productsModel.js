const { ObjectId } = require('mongodb');
const connection = require('./connection');

const findByName = async (name) => {
  const db = await connection('products');
  const product = await db.findOne({ name });
  return product;
};

const createData = async (name, quantity) => {
  const db = await connection('products');
  const newProduct = await db.insertOne({ name, quantity });
  return { _id: newProduct.insertedId, name, quantity };
};

const findById = async (id) => {
  const db = await connection('products');
  if (!ObjectId.isValid(id)) return null;

  const result = await db.findOne(ObjectId(id));
  console.log(result);
  return result;
};

const findAll = async () => {
  const db = await connection('products');
  const allProducts = await db.find().toArray();
  return allProducts;
};

const productUpdate = async (id, name, quantity) => {
  const db = await connection('products');
  const actProduct = await db.updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });
  return actProduct;
};

const deleteProduct = async (id) => {
  const db = await connection('products');
  const delProduct = db.deleteOne({ _id: ObjectId(id) });
  return delProduct;
};

module.exports = {
  findById,
  findByName,
  createData,
  findAll,
  productUpdate,
  deleteProduct,
};
