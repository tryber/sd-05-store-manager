const { MongoClient } = require('mongodb');

let connection;

const DB_NAME = 'StoreManager';
const MONGO_DB_URL = `mongodb://mongodb:27017/${DB_NAME}`;

async function storeCollection(collectionName) {
  connection = connection || (await MongoClient.connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }));

  return connection.db(DB_NAME).collection(collectionName);
}

module.exports = storeCollection;
