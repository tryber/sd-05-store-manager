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
      return res.status(422).json({ err: { code: err.code, message: err.message } });
    }

    res.status(500).json({ message: 'Algo deu errado.' });
  }
});

products.get('/', async (_req, res) => {
  try {
    const allProducts = await service.getAll();

    res.status(200).json({ products: allProducts });
  } catch {
    res.status(500).json({ message: 'Algo deu errado.' });
  }
});

products.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await service.getById(id);

    res.status(200).json(product);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err: { code: err.code, message: err.message } });
    }
  }
});

products.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;

    const updatedProduct = await service.update(id, name, quantity);

    if (!name) {
      throw {
        code: 'invalid_data',
        message: '"name" should exist',
      };
    }

    if (name.length <= 5) {
      throw {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      };
    }

    if (quantity <= 0) {
      throw {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      };
    }

    if (typeof quantity === 'string') {
      throw {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      };
    }

    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(422).json({ err: { code: err.code, message: err.message } });
  }
});

products.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await service.remove(id);

    res.status(200).json(deletedProduct);
  } catch (err) {
    res.status(422).json({ err: { code: err.code, message: err.message } });
  }
});

module.exports = products;
