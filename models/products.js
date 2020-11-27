const { ObjectId } = require('mongodb');
const connection = require('./connection');
const { findById } = require('./shared');

const add = async (collection, query) => {
  const { name, quantity } = query;
  const db = await connection(collection);
  const result = await db.insertOne(query);

  return { _id: result.insertedId, name, quantity };
};

const update = async (collection, id, query) => {
  const { name, quantity } = query;
  const db = await connection(collection);

  await db.updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });

  return { _id: ObjectId(id), name, quantity };
};

const findByName = async (collection, name) => {
  const db = await connection(collection);
  const result = await db.findOne({ name });

  return result;
};

const exclude = async (collection, id) => {
  const db = await connection(collection);
  const deletedProduct = await db.findOne({ _id: ObjectId(id) });
  await db.deleteOne({ _id: ObjectId(id) });

  return deletedProduct;
};

const updateQuantity = async (collection, query, method) => {
  const db = await connection(collection);
  const promises = await query.map(async ({ productId, quantity }) => {
    const product = await findById('products', productId);
    if (method === 'POST') {
      const newQuantity = product.quantity - quantity;
      if (newQuantity < 0) return { err: true };
      await db.updateOne(
        { _id: ObjectId(productId) },
        { $set: { quantity: newQuantity } },
      );
    }

    if (method === 'DELETE') {
      await db.updateOne(
        { _id: ObjectId(productId) },
        { $set: { quantity: product.quantity + quantity } },
      );
    }
    const updatedProduct = await findById('products', productId);

    return updatedProduct;
  });

  return Promise.all(promises);
};

module.exports = {
  add,
  findByName,
  update,
  exclude,
  updateQuantity,
};
