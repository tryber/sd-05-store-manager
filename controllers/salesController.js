const { Router } = require('express');
const rescue = require('express-rescue');
const service = require('../services/salesService');

const sales = Router();

sales.get('/', rescue(async (_req, res) => {
  const allSales = await service.getAll();

  res.status(200).json({ sales: allSales });
}));

sales.get('/:id', rescue(async (req, res) => {
  const { id } = req.params;

  const sale = await service.getById(id);

  res.status(200).json(sale);
}));

sales.post('/', rescue(async (req, res) => {
  const newSales = await service.create(req.body);

  res.status(200).json(newSales);
}));

sales.delete('/:id', rescue(async (req, res) => {
  const { id } = req.params;

  const removedSale = await service.remove(id);

  res.status(200).json(removedSale);
}));

sales.put('/:id', rescue(async (req, res) => {
  const { id } = req.params;

  await service.update(id, req.body);

  res.status(200).json({ _id: id, itensSold: req.body });
}));

module.exports = sales;
