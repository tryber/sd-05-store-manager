const { MongoClient } = require('mongodb');

const DB_NAME = 'StoreManager';
//  local
const DB_URI = `mongodb://localhost:27017/${DB_NAME}`;
//  remoto
// const MONGO_DB_URL = `mongodb://mongodb:27017/${DB_NAME}`;

let connection = null;

module.exports = async (collectionName) => {
  const OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  connection = connection || (await MongoClient.connect(DB_URI, OPTIONS));
  return connection.db(DB_NAME).collection(collectionName);
};
// newUrlParser: novo interpretador do mongo pra evitar warning do antigo depredado
// UnifiedTopology nova forma de conexão driver
