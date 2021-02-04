const { Router } = require('express');

const salesService = require('../services/salesService');

const salesRoute = Router();

// Checked
salesRoute.post(
  '/',
  async (req, res) => {
    const sale = await salesService.createSale(req.body);
    console.log(req.body);
    if (sale.err) return res.status(422).json(sale);
    res.status(201).json(sale);
  },
);

// Checked
salesRoute.get(
  '/',
  async (_req, res) => {
    const sales = await salesService.getAllSales();
    if (!sales) res.status(422).json({ message: 'Dados inválidos' });
    res.status(200).json(sales);
  },
);

// Checked
salesRoute.get(
  '/:id',
  async (req, res) => {
    const { id } = req.params;
    const sale = await salesService.getSaleById(id);
    if (!sale) res.status(422).json({ message: 'Dados inválidos' });
    res.status(200).json(sale);
  },
);

salesRoute.put(
  '/:id',
  async (req, res) => {
    const { id } = req.params;
    const { productId, quantity } = req.body;
    const sale = await salesService.update(id, productId, quantity);
    if (!sale) res.status(422).json({ message: 'Dados inválidos' });
    res.status(200).json(sale);
  },
);

// Checked
salesRoute.delete(
  '/:id',
  async (req, res) => {
    const { id } = req.params;
    const sale = await salesService.deleteSale(id);
    if (!sale) res.status(422).json({ message: 'Dados inválidos' });
    res.status(200).json(sale);
  },
);

module.exports = salesRoute;
