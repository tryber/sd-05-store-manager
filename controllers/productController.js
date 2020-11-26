const express = require('express');
// const rescue = require('express-rescue');
const productModel = require('../models/productModel');
const productService = require('../services/productService');

const productRouter = express.Router();

productRouter.post('/', async (req, res) => {
  const { name, quantity } = req.body;

  try {
    const addedValidatedProduct = await productService.add(name, quantity);

    res.status(201).json(addedValidatedProduct);
  } catch (err) {
    if (err.code === 'invalid_data') {
      // console.log((err));
      return res.status(422).json({err: {code: err.code, message: err.message}});
    }
    console.error(err);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

productRouter.get('/', async (req, res) => {
  try {
    const products = await productModel.getAll();

    res.status(200).json({ products });
  } catch (err) {
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

productRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  try {
    const product = await productService.findById(id);
    // console.log(product);
    return res.status(200).json(product);
  } catch (err) {
    if (err.err.code === 'invalid_data') {
      return res.status(422).json(err);
    }
    console.error(err);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

productRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  try {
    const updatedProduct = await productService.update(id, name, quantity);

    return res.status(200).json(updatedProduct);
  } catch (err) {
    if (err.err.code === 'invalid_data') {
      return res.status(422).json(err);
    }
    // console.error(err);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

// productRouter.get('/', async (req, res) => {
//   try {

//   } catch (err) {

//   }
// });

// productRouter.get('/', async (req, res) => {
//   try {

//   } catch (err) {

//   }
// });

// productRouter.get('/', async (req, res) => {
//   try {

//   } catch (err) {

//   }
// });

module.exports = productRouter;
