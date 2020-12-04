// const crudModel = require('../models/crudModel');
const productsModel = require('../models/productsModel');
const errMsg = require('./erroResponse');

const validaName = async (req, res, next) => {
  const { name } = req.body;
  if (name.length < 5) {
    return res.status(422).json(errMsg('invalid_data', '"name" length must be at least 5 characters long'));
  }
  const product = await productsModel.findByName(name);

  if (product) {
    return res.status(422).json(errMsg('invalid_data', 'Product already exists'));
  }
  next();
};

const validaQtd = async (req, res, next) => {
  const { quantity } = req.body;
  if (quantity <= 0) {
    return res.status(422).json(errMsg('invalid_data', '"quantity" must be larger than or equal to 1'));
  }

  if (quantity && !Number.isInteger(quantity)) {
    return res.status(422).json(errMsg('invalid_data', '"quantity" must be a number'));
  }
  next();
};

const validaId = async (req, res, next) => {
  const { id } = req.params;
  const product = await productsModel.findById(id);

  if (!product) {
    return res.status(422).json(errMsg('invalid_data', 'Wrong id format'));
  }

  req.product = product;

  next();
};

module.exports = {
  validaName,
  validaQtd,
  validaId,
};
