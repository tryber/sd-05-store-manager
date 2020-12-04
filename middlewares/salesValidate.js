const salesModel = require('../models/salesModel');
// const productsModel = require('../models/productsModel');
const errMsg = require('./erroResponse');

const saleValidaQtd = async (req, res, next) => {
  const [...itensSold] = req.body;
  let error = false;

  itensSold.forEach((e) => {
    if (e.quantity <= 0 || typeof e.quantity !== 'number') {
      error = true;
    }
  });

  if (error) {
    return res.status(422).json(errMsg('invalid_data', 'Wrong product ID or invalid quantity'));
  }

  next();
};

const idExists = async (req, res, next) => {
  const { id } = req.params;
  const sale = await salesModel.findByIdSale(id);

  if (!sale) {
    return res.status(404).json(errMsg('not_found', 'Sale not found'));
  }

  req.sale = sale;

  next();
};

module.exports = {
  saleValidaQtd,
  idExists,
};
