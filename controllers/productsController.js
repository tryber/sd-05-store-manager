const { Router } = require('express');
const service = require('../services/productsService');

const products = Router();

products.get('/', async (_req, res) => {
  const Allproducts = await service.getAll();

  res.status(200).json(Allproducts);
});

products.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const product = await service.getById(id);

    res.status(200).json(product);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json(err);
    }
  }
});

products.post('/', async (req, res) => {
  try {
    const { name, quantity } = req.body;

    const newProduct = await service.create(name, quantity);

    res.status(201).json(newProduct);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json(err);
    }
  }
});

module.exports = products;
