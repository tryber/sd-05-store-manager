const { MongoClient } = require('mongodb');

const MONGO_DB_URL = `mongodb://localhost:27017/${DB_NAME}`;
const DB_NAME = 'StoreManager';

let connection = null;

module.exports = async (collectionName) => {
  connection = connection || await MongoClient.connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  return connection.db(DB_NAME).collection(collectionName);
};
