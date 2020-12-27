const express = require('express');
const rescue = require('express-rescue');

const { modelsProduct } = require('../models/index');
const { verifyProduct, verifyId } = require('../middlewares/index');

const controllerProduct = express.Router();

// crie um endpoint para o cadastro de produtos;
controllerProduct.post(
  '/',
  verifyProduct,
  rescue(async (req, res) => {
    try {
      const { name, quantity } = req.body;
      const newProduct = await modelsProduct.createProduct(name, quantity);
      return res.status(201).json(newProduct);
    } catch (err) {
      if (err.code === 'invalid_data') {
        res.status(422).json({ err: { code: err.code, message: err.message } });
      }
      return res.status(500).json({ message: 'Oops! Something went wrong.' });
    }
  }),
);

// crie um endpoint para listar os produtos;
controllerProduct.get('/', async (_req, res) => {
  try {
    const allProducts = await modelsProduct.getAllProducts();
    return res.status(200).json({ products: allProducts });
  } catch {
    return res.status(500).json({ message: 'Oops! Something went wrong.' });
  }
});

controllerProduct.get('/:id', verifyId, async (req, res) => {
  const { id } = req.params;

  try {
    const product = await productsModel.findByProductId(id);
    return res.status(200).json(product);
  } catch (err) {
    return res.status(500).json({ message: 'Oops! Something went wrong.' });
  }
});

// criar endpoint que atualize produto.
controllerProduct.put('/:id', verifyProduct, async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  try {
    const updatedProduct = await productsModel.updateProductById(id, { name, quantity });

    return res.status(200).json(updatedProduct);
  } catch (err) {
    return res.status(500).json({ message: 'Oops! Something went wrong.' });
  }
});

// criar endpoint para deletar produto
controllerProduct.delete('/:id', verifyId, async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await productsModel.excludeProductById(id);

    return res.status(200).json(deletedProduct);
  } catch (err) {
    return res.status(500).json({ message: 'Oops! Something went wrong.' });
  }
});

module.exports = controllerProduct;
