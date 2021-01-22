const { MongoClient } = require('mongodb');

const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager';
const DB_NAME = 'StoreManager';

// const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';
// const DB_NAME = 'StoreManager';

let initialConnection = null;

const connectionDB = async (collectionName) => {
  initialConnection = initialConnection || (await MongoClient.connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }));
  return initialConnection.db(DB_NAME).collection(collectionName);
};

module.exports = connectionDB;
