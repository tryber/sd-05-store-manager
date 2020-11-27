const express = require('express');
const rescue = require('express-rescue');
const sales = require('../models/sales');
const shared = require('../models/shared');
const { validateSale, validateSaleId } = require('../middleware/index');

const saleController = express.Router();

saleController.post('/', validateSale, rescue(async (req, res) => {
  const [...itensSold] = req.body;
  const result = await sales.add('sales', itensSold);

  res.status(200).json(result);
}));

saleController.get('/:id', validateSaleId, rescue(async (req, res) => {
  const { id } = req.params;
  const findAllSales = await shared.findById('sales', id);

  res.status(200).json({ sales: findAllSales });
}));

saleController.get('/', rescue(async (_, res) => {
  const findAllSales = await shared.findAll('sales');

  res.status(200).json({ sales: findAllSales });
}));

saleController.put('/:id', validateSale, rescue(async (req, res) => {
  const { id } = req.params;
  const document = { itensSold: req.body };
  const updatedSale = await sales.update('sales', id, document);

  res.status(200).json(updatedSale);
}));

module.exports = saleController;
