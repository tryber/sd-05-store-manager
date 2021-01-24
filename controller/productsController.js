const express = require('express');
const rescue = require('express-rescue');

const { productsModel } = require('../models/index');
const { productService } = require('../service/index');

const productsController = express.Router();

productsController.post('/', rescue(async (request, response) => {
  const { name, quantity } = request.body;
  const createdProduct = await productService.validateProduct(name, quantity);
  response.status(201).json(createdProduct);
}));

productsController.get('/', rescue(async (_request, response) => {
  const products = await productsModel.getProducts();
  response.status(200).json({ products });
}));

productsController.get('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const product = await productService.validateProductId(id);
  res.status(200).send(product);
}));

module.exports = {
  productsController,
};
