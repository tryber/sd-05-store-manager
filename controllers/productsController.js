const { Router } = require('express');
const services = require('../services');

const products = Router();

products.post('/', async (req, res) => {
  try {
    const { name, quantity } = req.body;

    const newProdutct = await services.productsService.create(name, quantity);

    res.status(201).json(newProdutct);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err: { code: err.code, message: err.message } });
    }

    console.log(err);
    res.status(500).json({ message: 'Algo deu errado.' });
  }
});

products.get('/', async (_req, res) => {
  try {
    const allProducts = await services.productsService.getAll();

    res.status(200).json({ products: allProducts });
  } catch {
    res.status(500).json({ message: 'Algo deu errado.' });
  }
});

products.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await services.productsService.getById(id);

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

    const updatedProduct = await services.productsService.update(id, name, quantity);

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
    const deletedProduct = await services.productsService.remove(id);

    res.status(200).json(deletedProduct);
  } catch (err) {
    res.status(422).json({ err: { code: err.code, message: err.message } });
  }
});

module.exports = products;
