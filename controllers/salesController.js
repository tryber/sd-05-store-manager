const express = require('express');
const salesModel = require('../models/salesModel');
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

salesController.get('/', async (req, res) => {
  try {
    const sales = await salesModel.getAll();
    res.status(200).json({ sales });
  } catch (err) {
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

salesController.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // console.log('entrou 1', id);
    const sales = await salesService.findById(id);
    res.status(200).json({ sales });
  } catch (err) {
    if (err.code === 'not_found') {
      return res.status(404).json({ err: { code: err.code, message: err.message } });
    }
  }
});

module.exports = salesController;
