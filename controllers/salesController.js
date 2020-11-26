const express = require('express');
const salesService = require('../services/salesServices');

const salesController = express.Router();

salesController.post('/', async (req, res) => {
  const itensSold = req.body;

  try {
    const itensSoldAdded = await salesService.addSale(itensSold);
    res.status(200).json(itensSoldAdded);
  } catch (err) {
    if (err.code === 'invalid_data') {
      // console.log((err));
      return res.status(422).json({ err: { code: err.code, message: err.message } });
    }
  }
});

module.exports = salesController;
