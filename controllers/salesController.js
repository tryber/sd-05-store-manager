const { Router } = require('express');
const rescue = require('express-rescue');

const salesService = require('../services/salesService');

const salesRoute = Router();

salesRoute.post(
  '/',
  async (req, res) => {
    const sales = await salesService.createSale(req.body);
    if (sales.err) return res.status(422).json(sales);
    res.status(200).json(sales);
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
    const { id } = req.params;
    const { productId, quantity } = req.body;
    const sale = await salesService.update(id, productId, quantity);
    if (sale.err) return res.status(422).json(sale);
    res.status(200).json(sale);
  },
);

salesRoute.delete(
  '/:id',
  async (req, res) => {
    const { id } = req.params;
    const saleDelete = await salesService.deleteSale(id);
    if (saleDelete.err) return res.status(422).json(saleDelete);
    res.status(200).json(saleDelete);
    // console.log('no controller', saleDelete);
  },
);

module.exports = salesRoute;
