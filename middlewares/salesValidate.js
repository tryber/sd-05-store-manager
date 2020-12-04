// const salesModel = require('../models/salesModel');
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

module.exports = {
  saleValidaQtd,
};
