const { MongoClient } = require('mongodb');
require('dotenv').config();

const URI = process.env.MONGO_DB_URL || 'mongodb://mongodb:27017/StoreManager' ;
const DB_NAME = process.env.DB_NAME;

let connection = null;

module.exports = async (collectionName) =>
  connection = connection ||
  MongoClient.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then((connection) => connection.db(DB_NAME).collection(collectionName));
