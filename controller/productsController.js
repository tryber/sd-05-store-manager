const { Router } = require('express');

const service = require('../services/productsService');

const products = Router();

products.get('/', async (_req, res) => {
  const productsList = await service.getAll();
  res.status(200).json(productsList);
});

products.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await service.getById(id);
    res.status(200).json(product);
  } catch (err) {
    /* if (err.code === 'invalid_data') { */
    return res.status(422).json(err);
    /* } */
    /* console.error(err);
    res.status(500).json({ message: 'Algo deu errado' }); */
  }
});

products.post('/', async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const newProduct = await service.insert(name, quantity);
    res.status(201).json(newProduct);
  } catch (err) {
    /* if (err.code === 'invalid_data') { */
    return res.status(422).json(err);
    /* } */
    /* console.log(err)
    res.status(500).json({ message: 'Algo deu errado' }); */
  }
});

products.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const newProduct = await service.update(id, name, quantity);
    res.status(200).json(newProduct);
  } catch (err) {
    /* if (err.code === 'invalid_data') { */
    return res.status(422).json(err);
    /* } */
    /* console.log(err)
    res.status(500).json({ message: 'Algo deu errado' }); */
  }
});

products.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await service.exclude(id);
    res.status(200).json(product);
  } catch (err) {
    return res.status(422).json(err);
  }
});

module.exports = products;
