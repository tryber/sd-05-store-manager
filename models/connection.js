const { MongoClient } = require('mongodb');

require('dotenv').config();

const DB_NAME = 'StoreManager';
const MONGO_DB_URL = process.env.MONGO_DB_URL || `mongodb://mongodb:27017/${DB_NAME}`;

const client = new MongoClient(MONGO_DB_URL, { useUnifiedTopology: true, useNewUrlParser: true });
let connection = null;

module.exports = async (collection) => {
  try {
    connection = connection || await client.connect();
    return await connection.db(DB_NAME).collection(collection);
  } catch {
    await client.close();
  };
};
