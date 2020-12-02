const { Router } = require('express');
const {
  registerSales,
  listSales,
} = require('../services/sales.service');

const sales = Router();

sales.post('/', registerSales, (req, res) => {
  res.status(200).json(req.data);
});

sales.get('/', listSales, (req, res) => {
  res.status(200).json(req.data);
});

sales.get('/:id', listSales, (req, res) => {
  res.status(200).json(req.data);
});

module.exports = sales;
