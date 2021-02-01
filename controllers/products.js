const { Router } = require('express');
const servicesProducts = require('../services/products');

const productsRouter = Router();

productsRouter.get('/', async (req, res) => {
  try {
    const products = await servicesProducts.getAll();
    return res.status(200).json({ products });
  } catch (err) {
    return err;
  }
});

productsRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id)
    const product = await servicesProducts.getById(id, res);
    return res.status(200).json(product);
  } catch (err) {
    return res.status(err.status).json({ err });
  }
});

productsRouter.post('/', async (req, res) => {
  const { name, quantity } = req.body;
  try {
    const newProduct = await servicesProducts.insertNewProduct(name, quantity);
    return res.status(201).json(newProduct);
  } catch (err) {
    return res.status(err.status).json({ err });
  }
});

productsRouter.put('/:id', async (req, res) => {
  const { name, quantity } = req.body;
  const { id } = req.params;
  try {
    const changedProduct = await servicesProducts.changeById(id, name, quantity);
    return res.status(200).json(changedProduct);
  } catch (err) {
    return res.status(err.status).json({ err });
  }
});

module.exports = productsRouter;
