const express = require('express');
const { verifySale } = require('../middlewares/index');
const { salesModel } = require('../models/index');

const salesController = express.Router();

// requisito 5 - crie um endpoint para o cadastro de vendas;
salesController.post('/', verifySale, async (req, res) => {
  try {
    const { itensSold } = req.body;
    const newSales = await salesModel.createSales(itensSold);

    return res.status(200).json(newSales);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err: { code: err.code, message: err.message } });
    }

    return res.status(500).json({ message: 'Oops! Something went wrong.' });
  }
});

module.exports = salesController;
