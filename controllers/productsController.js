const express = require('express');

const { verifyProduct } = require('../middlewares/index');
const { productsModel } = require('../models/index');

const productsController = express.Router();

// requisito 1 - crie um endpoint para o cadastro de produtos;
productsController.post('/', verifyProduct, async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const newProdutct = await productsModel.createProduct(name, quantity);

    res.status(201).json(newProdutct);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err: { code: err.code, message: err.message } });
    }

    res.status(500).json({ message: 'Oops! Something went wrong.' });
  }
});

// requisito 2 - crie um endpoint para listar os produtos;
productsController.get('/', async (_req, res) => {
  try {
    const allProducts = await productsModel.getAllProducts();

    res.status(200).json({ products: allProducts });
  } catch {
    res.status(500).json({ message: 'Oops! Something went wrong.' });
  }
});

module.exports = productsController;
