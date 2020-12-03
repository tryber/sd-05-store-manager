const productModel = require('../models/productModel');

const errorMessage = (code, message) => ({ err: { code, message } });

const validateName = (req, res, next) => {
  const { name } = req.body;

  if (name.length < 5) {
    return res
      .status(422)
      .json(errorMessage('invalid_data', '"name" length must be at least 5 characters long'));
  }
  next();
};

const validateDuplicatedProduct = async (req, res, next) => {
  const { name } = req.body;
  const product = await productModel.getProductByName(name);
  if (product) {
    return res.status(422).json(errorMessage('invalid_data', 'Product already exists'));
  }
  next();
};

const validateQuantity = (req, res, next) => {
  const { quantity } = req.body;
  if (quantity < 0 || quantity === 0) {
    return res
      .status(422)
      .json(errorMessage('invalid_data', '"quantity" must be larger than or equal to 1'));
  }
  next();
};

const validateSale = (req, res, next) => {
  const { quantity } = req.body;
  if (!Number.isInteger(quantity)) {
    return res.status(422).json(errorMessage('invalid_data', '"quantity" must be a number'));
  }
  next();
};

module.exports = {
  errorMessage,
  validateName,
  validateDuplicatedProduct,
  validateQuantity,
  validateSale,
};
