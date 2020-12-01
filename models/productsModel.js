const { ObjectId } = require('mongodb');
const connection = require('./connection');

const insert = async (name, quantity) =>
  connection('products')
    .then((products) => products.insertOne({ name, quantity }))
    .then((result) => ({ _id: result.insertedId, name, quantity }));

const getAll = async () => connection('products').then((products) => products.find({}).toArray());

const getById = async (id) =>
  connection('products').then((products) =>
    ObjectId.isValid(id) ? products.findOne({ _id: ObjectId(id) }) : null,
  );

const getByName = async (name) => {
  const found = await connection('products').then((products) => products.findOne({ name: name }));
  return !found ? false : true;
};

const update = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) return;
  connection('products').then((products) =>
    products.updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }),
  );
  const updatedProduct = { _id: id, name, quantity };
  return updatedProduct;
};

const exclude = async (id) => {
  if (ObjectId.isValid(id)) {
    const deletedProduct = connection('products').then((products) =>
      products.findOne({ _id: ObjectId(id) }),
    );
    connection('products').then((products) => products.deleteOne({ _id: ObjectId(id) }));
    return deletedProduct;
  }
  return null;
};

module.exports = {
  getAll,
  getById,
  getByName,
  insert,
  update,
  exclude,
};
