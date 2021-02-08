const connection = require('./connection');

const register = async (name, quantity) => {
  try {
    const collection = await connection('products');
    const { ops: [response] } = await collection.insertOne({ name, quantity });
    return response;
  } catch (err) {
    console.error(err);
    return null;
  }
};

module.exports = {
  register,
};
