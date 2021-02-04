// https://developer.mongodb.com/quickstart/node-connect-mongodb

const { MongoClient } = require('mongodb');

// const DB_NAME = 'StoreManager';
// const MONGO_DB_URL = `mongodb://localhost:27017/${DB_NAME}`;
const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';

const connection = async () =>
  MongoClient.connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then((conn) => conn.db('StoreManager'))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });

module.exports = connection;
