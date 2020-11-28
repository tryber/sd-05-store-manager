const { ObjectId } = require('mongodb');

const getCollection = require('./connection');

const getAllSales = async () =>
  getCollection('sales').then((sales) => sales.find().toArray());

const getSalesById = async (id) => getCollection('sales').then((db) => db.findOne(ObjectId(id)));
  // if (!ObjectId.isValid(id)) return null;

// const getByNameAndAlbum = async ({ name, album }) => {
//   return getCollection('songs').then((songs) =>
//     songs.findOne({ name, album }).toArray()
//   );
// };

const createSales = async (itensSold) => {
  const sale = await getCollection('sales').then((db) => db.insertOne({ itensSold }));
  return { _id: sale.insertedId, itensSold };
};

const updateSales = async (id, itensSold) => {
  // if (!ObjectId.isValid(id)) return null;
  const sale = await getCollection('sales') // items sold in array na linha abaixo?
    .then((sales) => sales.updateOne({ _id: ObjectId(id) }, { $set: { itensSold } }));

  return sale;
};

const excludeSales = async (id) => getCollection('sales')
  .then((db) => db.deleteOne({ _id: ObjectId(id) }));
  // if (!ObjectId.isValid(id)) return null;

module.exports = {
  getAllSales,
  getSalesById,
  createSales,
  updateSales,
  excludeSales,
};
