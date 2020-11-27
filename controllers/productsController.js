const Boom = require('@hapi/boom');
const { Router } = require('express');

const productsService = require('../services/productsService');

const products = Router();

const collectionName = 'products';

products.post('/', async (req, res, next) => {
  try {
    const { name, quantity } = req.body;

    const registeredProduct = await productsService.register(collectionName, name, quantity);

    res.status(201).json(registeredProduct);
  } catch (error) {
    next(Boom.badData(error.message, error.code));
  }
});

products.get('/', async (_req, res) => {
  const allProducts = await productsService.listAll(collectionName);

  res.status(200).json(allProducts);
});

products.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const productById = await productsService.listById(collectionName, id);

    res.status(200).json(productById);
  } catch (error) {
    next(Boom.badData(error.message, error.code));
  }
});

products.put('/:id', async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    const { id } = req.params;

    const updatedProduct = await productsService.update(collectionName, id, name, quantity);

    res.status(200).json(updatedProduct);
  } catch (error) {
    next(Boom.badData(error.message, error.code));
  }
});

products.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await productsService.remove(collectionName, id);

    res.status(200).json(product);
  } catch (error) {
    next(Boom.badData(error.message, error.code));
  }
});

products.use('/', (err, _req, res, _next) => {
  console.error(err);

  if (Boom.isBoom(err)) {
    return res
      .status(err.output.statusCode)
      .json({ err: { code: err.data, message: err.message } });
  }

  res.status(500).json({ message: err.message });
});

module.exports = products;
