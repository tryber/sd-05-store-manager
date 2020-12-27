const makeConnection = require('./connection');
const { ObjectId } = rewuire('mongodb');

const createProduct = async (name, quantity) => {
  const newProduct = await makeConnection('products').then((products) =>
    products.insertOne({ name, quantity }),
  );
  return { _id: newProduct.insertedId, name, quantity };
};

const findByProductName = async (collection, name) => {
  const product = await makeConnection('products').then((products) => products.findOne({ name }));
  return product;
};

const findByProductId = async (id) => {
  const product = await makeConnection('products').then((products) =>
    products.findOne(ObjectId(id)),
  );
  return product;
};

const getAllProducts = async () => {
  const allProducts = await makeConnection('products').then((products) =>
    products.find({}).toArray(),
  );
  return allProducts;
};

const updateProductById = async (id, objeto) => {
  const { name, quantity } = objeto;
  const allProducts = await makeConnection('products');
  await allProducts.updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });
  return { _id: ObjectId(id), name, quantity };
};

const deleteProductById = async (id) => {
  const deletedProduct = await getCollection('products').then((products) =>
    products.deleteOne({ _id: ObjectId(id) }),
  );

  return deletedProduct;
};

module.exports = {
  createProduct,
  deleteProductById,
  getAllProducts,
  findByProductId,
  findByProductName,
  updateProductById,
};
