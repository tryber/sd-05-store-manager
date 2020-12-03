const { ObjectID } = require('mongodb');
const connection = require('./connection');

const getCollection = async () => connection('sales');

const register = async (itensSold) => {
  try {
    const collection = await getCollection();
    const { ops: [response] } = await collection.insertOne({ itensSold });
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const list = async ({ id }) => {
  try {
    const collection = await getCollection();
    return id
      ? await collection.findOne({ _id: ObjectID(id) })
      : { sales: await collection.find().toArray() };
  } catch (error) {
    console.error(error);
    return [];
  }
};

const saleDelete = async (id) => {
  try {
    const collection = await getCollection();
    const sale = await list({ id });
    if (!await collection.deleteOne({ _id: ObjectID(id) })) {
      throw new Error('Sale dont exists');
    }
    return sale;
  } catch (error) {
    console.error(error);
    return null;
  }
};

module.exports = {
  register,
  list,
  saleDelete,
};
