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
    return null;
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
  }
};

const update = async ({ id, ...data }) => {
  try {
    const collection = await getCollection('products');
    await collection.updateOne(
      { _id: ObjectID(id) },
      { $set: data },
    );
    return { id, ...data };
  } catch (error) {
    console.error(error);
    return null;
  }
};

const prodDelete = async (id) => {
  try {
    const collection = await getCollection('products');
    const product = await list({ id });
    if (!await collection.deleteOne({ _id: ObjectID(id) })) {
      throw new Error('Object dont exists');
    }
    return product;
  } catch (error) {
    console.error(error);
    return null;
  }
};

module.exports = {
  register,
  list,
  update,
  prodDelete,
};
