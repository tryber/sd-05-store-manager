const connection = require('./connection');
// const mongodb = require('mongodb');
// const { ObjectId } = require('mongodb');

// O model faz a relação com o BD, no caso, o mongoDB, usando o arquivo connection.js .

// async function isUnique(name) {
//   await connection();
//   const nameInBD = await db.collection('products').findOne(name).length;
//   if (nameInBD > 0) return false;
//   return true;
// }

async function create(name, quantity) {
  connection()
  .then((db) =>
    db.collection('products').insertOne({ name, quantity })
  )
  .then((result) => result);
};

module.exports = create;
