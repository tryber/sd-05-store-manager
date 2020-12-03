const { Router } = require('express');

const service = require('../Service/productsService');

const productss = Router();

productss.get('/', async (_req, res) => {
  const products = await service.getAll();

  res.status(200).json({ products });
});

productss.post('/', async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const newProduct = await service.create(name, quantity);

    res.status(201).json(newProduct);
  } catch (error) {
    if (error.err.code === 'invalid_data') {
      return res.status(422).json(error);
    }
    console.error(error);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

productss.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const product = await service.getById(id);

    res.status(200).json(product);
  } catch (error) {
    if (error.err.code === 'invalid_data') {
      return res.status(422).json(error);
    }
    console.error(error);
    res.status(500).json({ message: 'Algo deu errado.' });
  }
});

productss.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;

    const updateProduct = await service.update(id, name, quantity);
    res.status(200).json(updateProduct);
  } catch (error) {
    if (error.err.code === 'invalid_data') {
      return res.status(422).json(error);
    }
    console.error(error.message);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

productss.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const removeProduct = await service.remove(id);
    res.status(200).json(removeProduct);
  } catch (error) {
    if (error.err.code === 'invalid_data') {
      return res.status(422).json(error);
    }
    console.error(error);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

module.exports = productss;
