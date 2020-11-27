const { Router } = require('express');
const rescue = require('express-rescue');

const salesServices = require('../services/salesService');

const sales = Router();

// products.delete('/:id', rescue(async (req, res) => {
//   const { id } = req.params;
//   const deletedProduct = await peopleServices.getById(id);
//   await peopleServices.exclude(id);
//   res.status(200).json(deletedProduct);
// }));

// products.put('/:id', rescue(async (req, res) => {
//   const { id } = req.params;
//   const { name, quantity } = req.body;
//   await peopleServices.update(id, name, quantity);
//   res.status(200).json({ _id: id, name, quantity });
// }));

sales.post('/', rescue(async (req, res) => {
  const newSales = await salesServices.create(req.body);
  res.status(200).json(newSales);
}));

sales.get('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const unicSale = await salesServices.getById(id);
  res.status(200).json(unicSale);
}));

sales.get('/', rescue(async (req, res) => {
  const allSales = await salesServices.getAll();
  console.log(allSales);
  res.status(200).json({ sales: allSales });
}));

module.exports = sales;
