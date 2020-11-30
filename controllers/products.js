const { Router } = require('express');

// const { productsModel } = require('../models');
const { productService } = require('../services');

const productsRoute = Router();

productsRoute.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await productService.getById(id);
    return res.status(200).json(product);
  } catch (err) {
    return res.status(422).json({ err });
  }
});

productsRoute.get('/', async (_req, res) => {
  try {
    const products = await productService.getAll();
    return res.status(200).json({ products });
  } catch (err) {
    return res.status(500).json({ message: 'que feio servidor você não pode fazer isso' });
  }
});

productsRoute.post('/', async (req, res) => {
  const { name, quantity } = req.body;
  try {
    const product = await productService.create({ name, quantity });
    return res.status(201).json(product);
  } catch (err) {
    return res.status(422).json({ err });
  }
});

productsRoute.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  try {
    const product = await productService.edit(id, name, quantity);
    return res.status(200).json(product);
  } catch (err) {
    return res.status(422).json({ err });
  }
});

productsRoute.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await productService.deleteProduct(id);
    return res.status(200).json({ message: 'deletado' });
  } catch (err) {
    return res.status(422).json({ err });
  }
});

module.exports = productsRoute;
