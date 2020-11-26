const express = require('express');
const rescue = require('express-rescue');
// const productModel = require('../models/productModel');
const productService = require('../services/productService');

const productRouter = express.Router();
productRouter.post('/', async (req, res) => {
  const { name, quantity } = req.body;

  try {
    const addedValidatedProduct = await productService.add(name, quantity);

    res.status(201).json(addedValidatedProduct);
  } catch (err) {
    if (err.err.code === 'invalid_data') {
      console.log((err));
      return res.status(422).json(err);
    }
  }
});
// productRouter.post(
//   '/',
//   rescue(async (req, res) => {

//   }),
// );
// productRouter.post(
//   '/',
//   rescue(async (req, res) => {

//   }),
// );
// productRouter.post(
//   '/',
//   rescue(async (req, res) => {

//   }),
// );
// productRouter.post(
//   '/',
//   rescue(async (req, res) => {

//   }),
// );
// productRouter.post(
//   '/',
//   rescue(async (req, res) => {

//   }),
// );
module.exports = productRouter;
