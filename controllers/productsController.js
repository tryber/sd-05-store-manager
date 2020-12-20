const express = require('express');
const rescue = require('express-rescue');

const { productsModel } = require('../models/index');
const { verifyProduct } = require('../middlewares/index');

const productsController = express.Router();

// requisito 1 - crie um endpoint para o cadastro de produtos;
productsController.post('/', verifyProduct, rescue(async (req, res) => {
  const { name, quantity } = req.body;
  const addProduct = await productsModel.createProduct({ name, quantity });
  // controller chama o model diretamente, sem intermédio de service

  res.status(201).json(addProduct);
}));

// requisito 2 - crie um endpoint para listar os produtos;
productsController.get('/', rescue(async (_req, res) => {
  const products = await productsModel.getAll();
  res.status(200).json({ products });
}));

module.exports = productsController;
