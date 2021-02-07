// live com Hugão 06/02 desafio 1

const express = require('express');

const router = express.Router();

const service = require('../services/productsService');

router.post('/', async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const product = await service.create(name, quantity);
    return res.status(201).json(product);
  } catch (error) {
    if (error.err.code === 'invalid_data') {
      return res.status(422).json(error);
    }
    console.error(error);
    return res.status(500).json({ message: error });
  }
});

router.get('/', async (_req, res) => {
  const products = await service.getAll();
  res.status(200).json({ products });
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const product = await service.getById(id);

    res.status(200).json(product);
  } catch (error) {
    if (error.err.code === 'invalid_data') {
      return res.status(422).json(error);
    }
    console.error(error);
    res.status(500).json({ message: error });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;

    const updateProduct = await service.update(id, name, quantity);
    return res.status(200).json(updateProduct);
  } catch (error) {
    if (error.err.code === 'invalid_data') {
      return res.status(422).json(error);
    }
    console.error(error);
    res.status(500).json({ message: error });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const removeProduct = await service.exclude(id);
    res.status(200).json(removeProduct);
  } catch (error) {
    if (error.err.code === 'invalid_data') {
      return res.status(422).json(error);
    }
    console.error(error);
    res.status(500).json({ message: error });
  }
});

module.exports = router;
