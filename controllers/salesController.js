const { Router } = require('express');

const salesService = require('../services/salesService');

const salesRoute = Router();

salesRoute.post(
  '/', async (req, res) => {
    const sales = req.body;
    try {
      const response = await salesService.createSale(sales);
      return res.status(200).json(response);
    } catch (err) {
      if (err.code === 'invalid_data') {
        return res.status(422).json({ err });
      }
      if (err.code === 'stock_problem') {
        return res.status(404).json({ err });
      }
    }
  },
);

salesRoute.get(
  '/',
  async (_req, res) => {
    const sales = await salesService.getAllSales();
    if (sales.err) return res.status(404).json(sales);
    res.status(200).json(sales);
  },
);

salesRoute.get(
  '/:id',
  async (req, res) => {
    const { id } = req.params;
    const sale = await salesService.getSaleById(id);
    if (sale.err.code === 'not_found') return res.status(404).json(sale);
    if (sale.err) return res.status(422).json(sale);
    res.status(200).json(sale);
  },
);

salesRoute.put(
  '/:id',
  async (req, res) => {
    try {
      const { id } = req.params;
      const itemSold = req.body;
      const sale = await salesService.updateSale(id, itemSold);
      if (sale.err) return res.status(422).json(sale);
      res.status(200).json(sale);
    } catch (err) {
      res.status(422).json(err);
    }
  },
);

salesRoute.delete(
  '/:id',
  async (req, res) => {
    const { id } = req.params;
    const saleDelete = await salesService.deleteSale(id);
    if (saleDelete.err) return res.status(422).json(saleDelete);
    res.status(200).json(saleDelete);
  },
);

module.exports = salesRoute;
