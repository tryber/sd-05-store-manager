const getCollection = require('./connection');

const createProduct = async (name, quantity) => {
  const db = await getCollection('products');
  const newProduct = await db.insertOne({ name, quantity });
  console.log(newProduct);
  return { _id: newProduct.insertedId, name, quantity };
};

const findByProductName = async (name) => {
  const db = await getCollection('products');
  const result = await db.findOne({ name });

  return result;
};

const getAll = async () => {
  const db = await getCollection('products');
  const allProducts = await db.find().toArray();
  return allProducts;
};

module.exports = {
  createProduct,
  findByProductName,
  getAll,
};
