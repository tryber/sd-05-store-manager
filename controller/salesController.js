const { Router } = require('express');

const service = require('../services/salesService');

const sales = Router();

sales.get('/', async (_req, res) => {
  const salesList = await service.getAll();
  res.status(200).json({ sales: salesList });
});

sales.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await service.getById(id);
    res.status(200).json(sale);
  } catch (err) {
    return res.status(404).json(err);
  }
});

sales.post('/', async (req, res) => {
  try {
    const { body } = req;
    const newSale = await service.insert(body);
    res.status(200).json(newSale);
  } catch (err) {
    return res.status(422).json(err);
  }
});

sales.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const newSale = await service.update(id, body);
    res.status(200).json(newSale);
  } catch (err) {
    return res.status(422).json(err);
  }
});

sales.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await service.exclude(id);
    res.status(200).json(sale);
  } catch (err) {
    return res.status(422).json(err);
  }
});

module.exports = sales;
