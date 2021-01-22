const { MongoClient } = require('mongodb');

const DB_NAME = 'StoreManager';
const MONGO_DB_URL = process.env.MONGO_DB_URL || `mongodb://mongodb:27017/${DB_NAME}`;

let connection = null;
const getConnection = async () => {
  connection =
    connection ||
    (await MongoClient.connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }));
  return connection.db(DB_NAME);
};

// const mongo = require('mongodb').MongoClient;


// const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager'; // pop
//

// const connection = () =>
//   mongo
//     .connect(MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then((connected) => connected.db(DB_NAME))
//     .catch((err) => {
//       console.log(err);
//       process.exit(1);
//     });

module.exports = getConnection;

