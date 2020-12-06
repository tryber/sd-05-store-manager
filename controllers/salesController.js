const { Router } = require('express');
const { salesService } = require('../services');

const sales = Router();

sales.post('/', async (req, res) => {
  try {
    const saleInfo = req.body;

    const newItemSold = await salesService.register(saleInfo);

    res.status(200).json(newItemSold);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err: { code: err.code, message: err.message } });
    }
  }
});

sales.get('/', async (_req, res) => {
  try {
    const allSales = await salesService.getAllSales();

    res.status(200).json({ sales: allSales });
  } catch (err) {
    res.status(500).json({ message: 'Algo deu errado.' });
  }
});

sales.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const sale = await salesService.getSaleById(id);

    res.status(200).json(sale);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err: { code: err.code, message: err.message } });
    }

    if (err.code === 'not_found') {
      return res.status(404).json({ err: { code: err.code, message: err.message } });
    }

    res.status(500).json({ message: 'Algo deu errado.' });
  }
});

module.exports = sales;
