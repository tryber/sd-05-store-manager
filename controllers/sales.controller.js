const { Router } = require('express');
const {
  registerSales,
  listSales,
  updateSale,
  deleteSale,
} = require('../services/sales.service');

const sales = Router();

sales.post('/', registerSales, (req, res) => {
  res.status(200).json(req.data);
});

sales.get('/', listSales, (req, res) => {
  res.status(200).json(req.data);
});

sales.get('/:id', listSales, (req, res) => {
  res.status(200).json(req.data);
});
sales.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { productId, quantity } = req.body[0];

  try {
    const updatedSale = await updateSale(id, productId, quantity);
    res.status(200).json(updatedSale);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err: { code: err.code, message: err.message } });
    }

    res.status(500).json({ message: 'Error Code - sales Update' });
  }
});

sales.delete('/:id', deleteSale, (req, res) => {
  res.status(200).json(req.data);
});

module.exports = sales;
