const getConnection = require('./connection');

const createProduct = async (name, quantity) => {
  const db = await getConnection('products');
  const newProduct = await db.insertOne({ name, quantity });
  console.log(newProduct);
  return { _id: newProduct.insertedId, name, quantity };
};

const findByProductName = async (collection, name) => {
  const db = await getConnection(collection);
  const result = await db.findOne({ name });

  return result;
};

const getAll = async () => {
  const db = await getConnection('products');
  const allProducts = await db.find().toArray();
  return allProducts;
};

module.exports = {
  createProduct,
  findByProductName,
  getAll,
};
