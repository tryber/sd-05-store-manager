const express = require('express');
//https://github.com/rwillians/express-rescue
const rescue = require('express-rescue');
const validations = require('../services/validations');
const router = express.Router();
const getAllProducts = require('../models/productModel');

router.post(
  '/',
  validations.validateName,
  validations.validateDuplicatedProduct,
  validations.validateQuantity,
  validations.validateSale,
  validations.validateSaleById,
  rescue(async (req, res) => {
    const {name, quantity} = req.body;
    const {product} = await productModel.addProduct(name, quantity);
    console.log(req.body);
    return res.status(201).json({product});
  }),
);
// terminar
router.get('/', async (req, res) => {
  const allProducts = await getAllProducts(req.body);
  res.status(200).json(allProducts);
});

router.get('/:id', async (req, res) => {
  const product = await productModel.findById(req.params.id);
  res.status(200).json(product);
});

router.delete('/:id', validations.validateSaleById, rescue(async (req, _res) => {
    const { id } = req.params;
    await productModel.removeProduct(id);
  }),
);

module.exports = router;
