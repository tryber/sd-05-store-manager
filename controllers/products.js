const { Router } = require('express');

const services = require('../services/products');

const productsRouter = Router();

productsRouter.get('/', async (req, res) => {
  const products = await services.getAll();
  res.status(200).json({ products });
});

productsRouter.post('/', async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const novo = await services.create(name, quantity);
    return res.status(201).json(novo);
  } catch (error) {
    if (error.err.code === 'invalid_data') return res.status(422).json(error);
    console.error(error);
    res.status(500).json({ message: 'Deu ruim no POST' });
  }
});

productsRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // console.log('id no controller => ', id);
    const products = await services.getProduct(id);
    res.status(200).json(products);
  } catch (error) {
    if (error.err.code === 'invalid_data') {
      return res.status(422).json(error);
    }
    res.status(500).json({ message: 'Deu ruim' });
  }
});

productsRouter.put('/:id', async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const { id } = req.params;
    const updated = await services.update(id, name, quantity);
    res.status(200).json(updated);
  } catch (error) {
    if (error.err.code === 'invalid_data') {
      return res.status(422).json(error);
    }
    res.status(500).json({ message: 'Deu ruim' });
  }
});

productsRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await services.remove(id);
    res.status(200).json(deleted);
  } catch (error) {
    if (error.err.code === 'invalid_data') {
      return res.status(422).json(error);
    }
    res.status(500).json({ message: 'Deu ruim' });
  }
});

module.exports = productsRouter;
