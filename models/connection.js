const mongo = require('mongodb').MongoClient;

const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';
const DB_NAME = 'StoreManager';

const connection = () => {
  return mongo
    .connect(MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then( connected => connected.db(DB_NAME))
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

module.exports = connection;
