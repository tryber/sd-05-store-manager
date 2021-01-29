const express = require('express');

const router = express.Router();
const rescue = require('express-rescue');
const productService = require('../services/productService');

router.post(
  '/',
  rescue(async (req, res) => {
    const { name, quantity } = req.body;
    const product = await productService.createProduct(name, quantity);
    if (!product) res.status(400).json({ message: 'Dados inválidos' });
    res.status(201).json(product);
  }),
);

router.get(
  '/',
  async (req, res) => {
    const { name, quantity } = req.body;
    cosnt product = await productService.getAllProducts(name, quantity);
    if (!product) res.status(400).json({ message: 'Dados inválidos' });
    res.status(200).json(product);
  }
);

router.get(
  '/:id',
  async (req, res) => {
    const { id } = req.params;
    const product = await productService.getProductsById(id);
    if (!product) res.status(400).json({ message: 'Dados inválidos' });
    res.status(200).json(product);
  }
);

router.put(
  '/:id',
  async (req, res) => {
    const { id } = req.body;
    const product = await productService.updateProduct(id);
    if (!product) res.status(400).json({ message: 'Dados inválidos' });
    res.status(200).json(product);
  }
);

router.delete(
  '/:id',
  async (req, res) => {
    const { id } = req.params;
    const product = await productService.updateProduct(id);
    if (!product) res.status(400).json({ message: 'Dados inválidos' });
    res.status(200).json(product);
  }
);
// sales.get('/', productService.addProduct, (req, res) => {
//   res.status(200).json(req.data);
// });

// // terminar
// router.get('/', async (req, res) => {
//   const allProducts = await getAllProducts(req.body);
//   res.status(200).json(allProducts);
// });

// router.get('/:id', async (req, res) => {
//   const product = await productModel.findById(req.params.id);
//   res.status(200).json(product);
// });

// router.delete(
//   '/:id',
//   validations.validateSaleById,
//   rescue(async (req, _res) => {
//     const { id } = req.params;
//     await productModel.removeProduct(id);
//   }),
// );

module.exports = router;
