const express = require('express');
//https://github.com/rwillians/express-rescue
const rescue = require('express-rescue');
const productModel = require('../models/productModel');
const validations = require('../middlewares/productValidations');
const router = express.Router();

router.post(
  '/',
  validations.validateName,
  validations.validateDuplicatedProduct,
  validations.validateQuantity,
  validations.validateSale,
  validations.validateSaleById,
  rescue(async (req, res) => {
    const { name, quantity } = req.body;
    const product = await productModel.addProduct(name, quantity);
    return res.status(201).json(product);
  }),
);

router.get('/', async (_req, res) => {
  const products = await productModel.getAllProducts();
  res.status(200).json({ products });
});

router.get('/:id', async (req, res) => {
  const product = await productModel.findById(req.params.id);
  res.status(200).json(product);
});

router.delete(
  '/:id',
  validations.validateSaleById,
  rescue(async (req, _res) => {
    const { id } = req.params;
    await productModel.removeProduct(id);
  }),
);

module.exports = router;
