const { MongoClient } = require('mongodb');
require('dotenv').config();

const MONGO_DB_URL = process.env.MONGO_DB_URL
|| 'mongodb://mongodb:27017/StoreManager';

const DB_NAME = 'StoreManager';

let connection = null;

module.exports = async (collection) => {
  connection = connection || (await MongoClient.connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }));
  return connection.db(DB_NAME).collection(collection);
};
