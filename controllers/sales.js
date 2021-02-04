const { Router } = require('express');
const servicesSales = require('../services/sales');

const salesRouter = Router();

salesRouter.post('/', async (req, res) => {
  try {
    const newSale = await servicesSales.insertNewSale(req.body);
    return res.status(200).json(newSale);
  } catch (err) {
    return res.status(err.status).json({ err });
  }
});

salesRouter.get('/', async (_req, res) => {
  try {
    const allSales = await servicesSales.getSales();
    return res.status(200).json(allSales);
  } catch (err) {
    return res.status(err.status).json({ err });
  }
});

salesRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await servicesSales.getSale(id);
    return res.status(200).json(sale);
  } catch (err) {
    if (err.code === 'not_found') {
      return res.status(404).json({ err });
    }
    res.status(500).json({ message: 'erro interno' });
  }
});

module.exports = salesRouter;
