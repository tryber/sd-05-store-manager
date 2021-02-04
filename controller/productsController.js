const express = require('express');
const rescue = require('express-rescue');

const { productsModel } = require('../models/index');
const { productService } = require('../service/index');
const { validation } = require('../middlewares/validateProducts');

const productsController = express.Router();

productsController.delete('/:id', rescue(async (request, response) => {
  const { id } = request.params;

  const product = await productService.validationToDeleteProduct(id);
  if (product.err) return response.status(422).json(product);

  response.status(200).json(product);
}));

productsController.put('/:id', validation, rescue(async (request, response) => {
  const { id } = request.params;
  const { name, quantity } = request.body;

  const result = await productsModel.updateProduct(id, name, quantity);

  response.status(200).json(result);
}));

productsController.post('/', validation, rescue(async (request, response) => {
  const { name, quantity } = request.body;
  const result = await productService.validateProduct(name, quantity);

  if (result.err) return response.status(422).json(result);

  response.status(201).json(result);
}));

productsController.get('/:id', rescue(async (request, response) => {
  const { id } = request.params;
  const product = await productService.validateProductId(id);

  if (product.err) return response.status(422).json(product);

  response.status(200).send(product);
}));

productsController.get('/', rescue(async (_request, response) => {
  const products = await productsModel.getProducts();

  response.status(200).json({ products });
}));

module.exports = {
  productsController,
};
