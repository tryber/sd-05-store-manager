const { MongoClient } = require('mongodb');

/* local
const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager'; */

// avaliador
const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';
const DB_NAME = 'StoreManager';

let connection;

const mongoCollection = async (name) => {
  connection =
    connection ||
    (await MongoClient.connect(MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }));
  return connection.db(DB_NAME).collection(name);
};

module.exports = mongoCollection;
