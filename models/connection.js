require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '../.env.testing' : '../.env',
}); // https://blog.rocketseat.com.br/variaveis-ambiente-nodejs/

const { MongoClient } = require('mongodb');

const { DB_NAME, MONGO_DB_URL } = process.env;

const connection = () => {
  MongoClient.connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then((conn) => conn.db(DB_NAME))
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
};

module.exports = connection;
