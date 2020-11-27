const { Router } = require('express');

const productService = require('../services/productsService');

const productModel = require('../models/productsModel');

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

    console.error(err);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

module.exports = productRouter;
