const { Router } = require('express');
const service = require('../services/productsService');

const products = Router();

products.post('/', async (req, res) => {
  try {
    const { name, quantity } = req.body;

    const newProdutct = await service.create(name, quantity);

    res.status(201).json(newProdutct);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json(err.message);
    }

    res.status(500).json({ message: 'Algo deu errado.' });
  }
});

module.exports = products;
