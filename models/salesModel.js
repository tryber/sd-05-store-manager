const { ObjectId } = require('mongodb');

const getCollection = require('./connection');

const getAllSales = async () =>
  getCollection('sales').then((sales) => sales.find().toArray());

const getSalesById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return getCollection('sales').then((db) => db.findOne(ObjectId(id)));
};

// const getByNameAndAlbum = async ({ name, album }) => {
//   return getCollection('songs').then((songs) =>
//     songs.findOne({ name, album }).toArray()
//   );
// };

const createSales = async ({ itemsSold }) => {
  const sale = await getCollection('sales').then((db) => db.insertOne({ itemsSold }));
  return { _id: sale.insertedId, itemsSold };
};

const updateSales = async ({ id, itemsSold }) => {
  if (!ObjectId.isValid(id)) return null;

  const sale = await getCollection('sales')
    .then((sales) => sales.updateOne({ _id: ObjectId(id) }, { $set: { itemsSold } })); // items sold in array?
  
  return sale;
};

const excludeSales = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return getCollection('sales').then((db) => {
    return db.deleteOne({ _id: ObjectId(id) });
  });
};

module.exports = {
  getAllSales,
  getSalesById,
  createSales,
  updateSales,
  excludeSales,
};
