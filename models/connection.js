const { MongoClient } = require('mongodb');

const DB_NAME = 'StoreManager';
const MONGO_DB_URL = process.env.MONGO_DB_URL || `mongodb://localhost:27017/${DB_NAME}`;

let connection = null;
const getConnection = async () => {
  connection = connection || await MongoClient.connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = await connection.db(DB_NAME);
  return db;
};

module.exports = getConnection;
