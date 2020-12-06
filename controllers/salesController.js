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

module.exports = sales;
