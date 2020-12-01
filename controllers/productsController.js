const { Router } = require('express');
const rescue = require('express-rescue');
const service = require('../services/productsService');

const products = Router();

products.get('/', async (_req, res) => {
  const products = await service.getAll();

  res.status(200).json(products);
});

products.get('/:id', rescue(async (req, res) => {
  const product = await service.getById(req.params.id);

  res.status(200).json(product);
}));

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
