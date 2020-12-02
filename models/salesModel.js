const { ObjectId } = require('mongodb');
const connection = require('./connection');

const insert = async (array) =>
  connection('sales')
    .then((sales) => sales.insertOne({ itensSold: array }))
    .then((result) => ({ _id: result.insertedId, itensSold: array }));

const getAll = async () => connection('sales').then((sales) => sales.find({}).toArray());

const getById = async (id) =>
  connection('sales').then((sales) => {
    if (ObjectId.isValid(id)) {
      return sales.findOne({ _id: ObjectId(id) });
    }
    return null;
  });

const update = async (id, array) => {
  if (!ObjectId.isValid(id)) return;
  connection('sales').then((sales) =>
    sales.updateOne({ _id: ObjectId(id) }, { $set: { itensSold: array } }),
  );
  const updatedProduct = { _id: id, itensSold: array };
  return updatedProduct;
};

const exclude = async (id) => {
  if (ObjectId.isValid(id)) {
    const deletedProduct = connection('sales').then((sales) =>
      sales.findOne({ _id: ObjectId(id) }),
    );
    connection('sales').then((sales) => sales.deleteOne({ _id: ObjectId(id) }));
    return deletedProduct;
  }
  return null;
};

module.exports = {
  insert,
  getAll,
  getById,
  exclude,
  update,
};
