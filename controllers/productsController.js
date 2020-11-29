const { Router } = require('express');

const productService = require('../services/productsService');

// const productModel = require('../models/productsModel');

const productRouter = Router();

productRouter.post('/', async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const newProduct = await productService.create(name, quantity);

    res.status(201).json(newProduct);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err });
    }

    // console.error(err);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

productRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productService.getById(+id);

    res.status(200).json(product);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err });
    }

    console.error(err);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

productRouter.get('/', async (req, res) => {
  try {
    const products = await productService.getAll();

    res.status(200).json({ products });
  } catch (err) {
    console.error(err);

    res.status(500).json({ message: 'Algo deu errado' });
  }
});

productRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  try {
    const product = await productService.updateById(id, name, quantity);

    res.status(200).json(product);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err });
    }
    // console.error(err);

    res.status(500).json({ message: 'Algo deu errado' });
  }
});

module.exports = productRouter;
