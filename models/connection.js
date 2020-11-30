const { MongoClient } = require('mongodb');

// const MONGO_DB_URL_LOCAL = 'mongodb://localhost:27017/StoreManager';
const MONGO_DB_URL_LOCAL = 'mongodb://mongodb:27017/StoreManager';
const DB_NAME = 'StoreManager';

const connection = () =>
  MongoClient.connect(MONGO_DB_URL_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then((conn) => conn.db(DB_NAME))
    .catch((err) => {
      console.log(err);
    });

module.exports = connection;
