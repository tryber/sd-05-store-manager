const { Router } = require('express');

const salesService = require('../services/salesService');

const salesRoute = Router();

const errorMessage = (code, message) => ({ err: { code, message } });

salesRoute.post(
  '/',
  async (req, res) => {
    const { productId, quantity } = req.body;
    const sale = await salesService.insertSale(productId, quantity);
    if (!sale) res.status(422).json({ message: 'Dados inválidos' });
    res.status(201).json(sale);
  },
);

salesRoute.get(
  '/',
  async (_req, res) => {
    const sales = await salesService.getAllSales();
    if (!sales) res.status(422).res.status(400).err(errorMessage('invalid_data', 'wrong id format'));
    res.status(201).json(sales);
  },
);

salesRoute.get(
  '/:id',
  async (req, res) => {
    const { id } = req.params;
    const sale = await salesService.getSaleById(id);
    if (!sale) res.status(422).res.status(400).err(errorMessage('invalid_data', 'wrong id format'));
    res.status(200).json(sale);
  },
);

salesRoute.put(
  '/:id',
  async (req, res) => {
    const { id } = req.body;
    const sale = await salesService.update(id);
    if (!sale) res.status(400).json({ message: 'Dados inválidos' });
    res.status(200).json(sale);
  },
);

salesRoute.delete(
  '/:id',
  async (req, res) => {
    const { id } = req.params;
    const sale = await salesService.deleteSale(id);
    if (!sale) res.status(400).err(errorMessage('invalid_data', 'wrong id format'));
    res.status(200).json(sale);
  },
);

module.exports = salesRoute;
