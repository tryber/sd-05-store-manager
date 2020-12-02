const { ObjectID } = require('mongodb');
const connection = require('./connection');

const getCollection = async (name) => connection(name);

const register = async ({ name, quantity }) => {
  try {
    const collection = await getCollection('products');
    const { ops: [response] } = await collection.insertOne({ name, quantity });
    return response;
  } catch (error) {
    console.error(error);
    return { name, quantity, _id: -1 };
  }
};

const list = async ({ id }) => {
  try {
    const collection = await getCollection('products');
    return id
      ? await collection.findOne({ _id: ObjectID(id) })
      : { products: await collection.find().toArray() };
  } catch (error) {
    console.error(error);
    return [];
  };
};

module.exports = {
  register,
  list,
};
