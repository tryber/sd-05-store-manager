const { Router } = require('express');

const productService = require('../services/productsService');

// const productModel = require('../models/productsModel');

const productRouter = Router();

// const throwError = (err, res) => {
//   if (err.code === 'invalid_data') res.status(422).json({ err });
//   res.status(500).json({ message: 'Algo deu errado' });
// };

productRouter.post('/', async (req, res) => {
  const { name, quantity } = req.body;

  try {
    const newProduct = await productService.create(name, quantity);

    res.status(201).json(newProduct);
  } catch (err) {
    // throwError(err, res);
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err });
    }
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

productRouter.get('/', async (req, res) => {
  try {
    const products = await productService.getAll();

    res.status(200).json({ products });
  } catch (err) {
    return res.status(500).json({ message: 'Algo deu errado' });
  }
});

productRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    const product = await productService.getById(id);
    console.log(product);
    return res.status(200).json(product);
  } catch (err) {
    // throwError(err, res);
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err });
    }
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

productRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  try {
    const product = await productService.updateById(+id, name, quantity);

    res.status(200).json(product);
  } catch (err) {
    // throwError(err, res);
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err });
    }
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

productRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  try {
    const deletedProduct = await productService.remove(+id);
    // console.log(deletedProduct);
    res.status(200).json(deletedProduct);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err });
    }
    res.status(500).json({ message: 'Algo deu errado' });
    // throwError(err, res);
  }
});

module.exports = productRouter;
