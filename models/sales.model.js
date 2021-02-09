const { ObjectID } = require('mongodb');
const connection = require('./connection');

const register = async (itensSold) => {
  try {
    const collection = await connection('sales');
    const { ops: [response] } = await collection.insertOne({ itensSold });
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const list = async ({ id }) => {
  try {
    const collection = await connection('sales');
    return id
      ? await collection.findOne({ _id: ObjectID(id) })
      : { sales: await collection.find().toArray() };
  } catch (error) {
    console.error(error);
    return [];
  }
};

const update = async (id, productId, quantity) => {
  const collection = await connection('sales');
  const sale = await collection.updateOne(
    { _id: ObjectID(id), 'itensSold.productId': productId },
    { $set: { 'itensSold[0].quantity': quantity } },
  );
  return sale;
};

const saleDelete = async (id) => {
  try {
    const collection = await connection('sales');
    const sale = await list({ id });
    if (!await collection.deleteOne({ _id: ObjectID(id) })) {
      throw new Error('Sale don\'t exists');
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
  update,
  saleDelete,
};
