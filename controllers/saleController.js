const express = require('express');
const rescue = require('express-rescue');
const { validateSale } = require('../middleware/index');
const sales = require('../models/sales');

const saleController = express.Router();

saleController.post('/', validateSale, rescue(async (req, res) => {
  const [...itensSold] = req.body;
  const result = await sales.add('sales', itensSold);

  res.status(200).json(result);
}));

module.exports = saleController;
