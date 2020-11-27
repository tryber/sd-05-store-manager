const express = require('express');
const rescue = require('express-rescue');
const sales = require('../models/sales');
const shared = require('../models/shared');
const products = require('../models/products');
const { validateSale, validateSaleId, validateDeleteId } = require('../middleware/index');
const { findById } = require('../models/shared');

const saleController = express.Router();

saleController.post('/', validateSale, rescue(async (req, res) => {
  const [...itensSold] = req.body;
  const result = await sales.add('sales', itensSold);
  const prods = await products.updateQuantity('products', itensSold, req.method);
  prods.forEach((prod) => {
    if (req.method === 'POST' && prod.err) {
      return res.status(404).json({
        err: {
          code: 'stock_problem',
          message: 'Such amount is not permitted to sell',
        },
      });
    }
  });
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

saleController.delete('/:id', validateDeleteId, rescue(async (req, res) => {
  const { id } = req.params;
  const sale = await findById('sales', id);
  const excludedSale = await shared.exclude('sales', id);
  await products.updateQuantity('products', sale.itensSold, req.method);

  res.status(200).json(excludedSale);
}));

module.exports = saleController;
