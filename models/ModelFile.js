const connection = require('./connection');

const beta = async () => {
  try {
    const p = await connection().then((z) => z);
    return p;
  } catch (error) {
    console.error(error);
  }
};

module.exports = beta;
