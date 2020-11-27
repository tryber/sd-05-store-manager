// Referência:
// https://github.com/tryber/sd-05-live-lectures/blob/models-and-db/models/mongodbConnection.js

const { MongoClient } = require('mongodb');

const DB_NAME = 'StoreManager';
const MONGO_DB_URL = `mongodb://localhost:27017/${DB_NAME}`;
// const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';

let connection = null;

module.exports = async (collectionName) => {
  connection = connection
  || (await MongoClient.connect(MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }));
  return connection.db(DB_NAME).collection(collectionName);
};
