// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const theCollection = 'sales';

const create = async (arrayFromBody) => {
  const insert = await connection()
    .then((db) => db.collection(theCollection).insertOne({ itensSold: arrayFromBody }));
  //  .ops fornece o insert com o _id.
  return insert.ops[0];
};

module.exports = {
  create,
};
