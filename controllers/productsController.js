const { Router } = require('express');

const productService = require('../services/productService');

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const newProduct = await productService.create(name, quantity);
    return res.status(201).json(newProduct);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err: { code: err.code, message: err.message } });
    }
    console.error(err);
    return res.status(500).json('Algo deu errado');
  }
});

router.get('/', async (_req, res) => {
  const products = await productService.getAllProducts();
  return res.status(200).json({ products });
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productService.getProductById(id);
    return res.status(200).json(product);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err: { code: err.code, message: err.message } });
    }
    console.error(err);
    return res.status(500).json('Algo deu errado');
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const product = await productService.update(id, name, quantity);
    return res.status(200).json(product);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err: { code: err.code, message: err.message } });
    }
    console.error(err);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productService.remove(id);
    res.status(200).json(product);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err: { code: err.code, message: err.message } });
    }
  }
});

module.exports = router;
