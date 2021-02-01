const connection = require('./connection');

const getDataBase = async () => {
  try {
    const dataBase = await connection();
    return dataBase;
  } catch (error) {
    console.error(error);
  }
};

module.exports = getDataBase;
