const productsModels = require('../models/productsModels');

const getAllProducts = async () => productsModels.getAll();

const getByIdProducts = async (id) => {
  const product = await productsModels.getById(id);

  if (!product) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrond id format',
      },
    };
  }
  return product;
};

module.exports = {
  getAllProducts,
  getByIdProducts,
};
