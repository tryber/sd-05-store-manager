const productModel = require('../models/productModel');

const errorMessage = (code, message) => ({ err: { code, message } });

// Será validado que não é possível criar um produto com o nome menor que 5 caracteres
const validateName = (req, res, next) => {
  const { name } = req.body;
  console.log(req.body);

  if (!name) {
    return res
      .status(422)
      .json(errorMessage('invalid_data', '"name" is required'));
  }
  if (name.length < 5) {
    return res
      .status(422)
      .json(errorMessage('invalid_data', '"name" length must be at least 5 characters long'));
  }
  next();
};

// Será validado que não é possível criar um produto com o mesmo nome de outro já existente
const validateDuplicatedProduct = async (req, res, next) => {
  const { name } = req.body;
  const product = await productModel.findByName(name);
  if (product) {
    return res.status(422).json(errorMessage('invalid_data', 'Product already exists'));
  }
  next();
};

// Será validado que não é possível criar um produto com quantidade igual ou menor que zero
const validateQuantity = (req, res, next) => {
  const { quantity } = req.body;
  if (quantity <= 0) {
    return res
      .status(422)
      .json(errorMessage('invalid_data', '"quantity" must be larger than or equal to 1'));
  }
  next();
};

// Será validado que não é possível criar um produto com uma string no campo quantidade
const validateSale = (req, res, next) => {
  const { quantity } = req.body;
  if (!Number.isInteger(quantity)) {
    return res.status(422).json(errorMessage('invalid_data', '"quantity" must be a number'));
  }
  next();
};

const validateSaleById = async (req, res, next) => {
  const { id } = req.params;
  const product = await product.findById(id);

  if(!product) {
    return res.status(422).json(errorMessage('invalid data', 'wrong id format'));
  }
  next();
};

module.exports = {
  errorMessage,
  validateName,
  validateDuplicatedProduct,
  validateQuantity,
  validateSale,
  validateSaleById,
};
