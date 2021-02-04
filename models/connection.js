const { MongoClient } = require('mongodb');

// Para teste remoto:
const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager';

// const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';

let connection = null;
const getConnection = async () => {
  connection = connection
    || (await MongoClient.connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }));
  return connection.db('StoreManager');
};

module.exports = getConnection;
