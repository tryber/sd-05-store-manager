const express = require('express');
const rescue = require('express-rescue');

const { productsModel } = require('../models/index');
const { validateProduct, validateProductId } = require('../service/productsService');

const productsController = express.Router();

productsController.post('/', validateProduct, rescue(async (request, response) => {
  const { name, quantity } = request.body;
  const createdProduct = await productsModel.createProduct(name, quantity);
  response.status(201).json(createdProduct);
}));

productsController.get('/', rescue(async (_request, response) => {
  const products = await productsModel.getProducts();
  response.status(200).json({ products });
}));

productsController.get('/:id', validateProductId, rescue(async (request, response) => {
  const { id } = request.params;
  const product = await productsModel.getProductById(id);
  response.status(200).json(product);
}));

module.exports = {
  productsController,
};
