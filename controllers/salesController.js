const { Router } = require('express');

const salesService = require('../services/salesService');

const salesRoute = Router();

// Checked
salesRoute.post(
  '/',
  async (req, res) => {
    const sales = await salesService.createSale(req.body);
    console.log('aqui', sales);
    if (sales.err) return res.status(422).json(sales);
    res.status(200).json(sales);
  },
);

salesRoute.get(
  '/',
  async (_req, res) => {
    const sales = await salesService.getAllSales();
    console.log('aqui no controller', sales);
    if (sales.err) return res.status(404).json(sales);
    res.status(200).json(sales);
  },
);

// Checked
salesRoute.get(
  '/:id',
  async (req, res) => {
    const { id } = req.params;
    const sale = await salesService.getSaleById(id);
    console.log('no controller', sale.err.code);
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
    if (sale.err) return res.status(422).json(sale.err);
    res.status(200).json(sale);
  },
);

// Checked
salesRoute.delete(
  '/:id',
  async (req, res) => {
    const { id } = req.params;
    const saleDelete = await salesService.deleteSale(id);
    // console.log('no controller', saleDelete);
    const error = saleDelete.err.code;
    if (error) return res.status(422).json(saleDelete);
    res.status(200).json(saleDelete);
  },
);

module.exports = salesRoute;
