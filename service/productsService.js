const { productsModel } = require('../models/index');

const validateProduct = async (name, quantity) => {
  const isProductExists = await productsModel.getProducts()
    .then((product) => product.some((item) => item.name === name));

  if (isProductExists) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    };
  }

  return productsModel.createProduct(name, quantity);
};

const validateProductId = async (id) => {
  const result = await productsModel.getProductById(id);

  if (!result) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    };
  }

  return result;
};

const validationToDeleteProduct = async (id) => {
  const validation = await validateProductId(id);
  if (!validation.err) await productsModel.deleteProduct(id);
  return validation;
};

module.exports = {
  validateProduct,
  validateProductId,
  validationToDeleteProduct,
};
