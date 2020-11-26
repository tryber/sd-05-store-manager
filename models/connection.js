const { MongoClient } = require('mongodb');

const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager';
const DB_NAME = 'StoreManager';
const PARAMS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connection = () => MongoClient.connect(MONGO_DB_URL, PARAMS)
  .then((conn) => conn.db(DB_NAME))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

module.exports = connection;
