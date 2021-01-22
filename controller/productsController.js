const express = require('express');
const rescue = require('express-rescue');

const { productsModel } = require('../models/index');
const { validateProduct } = require('../service/productsService');

const productsController = express.Router();

productsController.post('/', validateProduct, rescue(async (request, response) => {
  const { name, quantity } = request.body;
  const createdProduct = await productsModel.createProduct(name, quantity);
  response.status(201).json(createdProduct);
}));

module.exports = {
  productsController,
};
