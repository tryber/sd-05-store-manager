const { Router } = require('express');
const { salesService } = require('../services');

const sales = Router();

sales.post('/', async (req, res) => {
  try {
    const sale = req.body;

    const stock = sale.map(async (item) => salesService.verifyStock(item.productId, item.quantity));

    await Promise.all(stock);

    const newItemSold = await salesService.register(sale);

    res.status(200).json(newItemSold);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err: { code: err.code, message: err.message } });
    }

    if (err.code === 'stock_problem') {
      return res.status(404).json({ err: { code: err.code, message: err.message } });
    }

    return res.status(500).json({ err: err.message });
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

sales.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const itensSold = req.body;

    const saleUpdated = await salesService.updateSale(id, itensSold);

    res.status(200).json(saleUpdated);
  } catch (err) {
    res.status(422).json({ err: { code: err.code, message: err.message } });
  }
});

sales.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSale = await salesService.deleteSale(id);

    res.status(200).json(deletedSale);
  } catch (err) {
    res.status(422).json({ err: { code: err.code, message: err.message } });
  }
});

module.exports = sales;
