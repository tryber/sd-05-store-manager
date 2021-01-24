const { MongoClient } = require('mongodb');

let connection;

const DB_NAME = 'StoreManager';
const MONGO_DB_URL = `mongodb+srv://store_manager:macbook@cluster0.m9kzj.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
// const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';

const getCollection = async (collectionName) => {
  const connect = await MongoClient.connect(
    MONGO_DB_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  );

  connection = connect;

  return connection.db(DB_NAME).collection(collectionName);
};

module.exports = { getCollection };
