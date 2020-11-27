const { Router } = require('express');

const service = require('../services/productService');

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const newProduct = await service.create(name, quantity);
    res.status(201).json(newProduct);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err: { code: err.code, message: err.message } });
    }
    console.error(err);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});
router.get('/', async (_req, res) => {
  const products = await service.getAll();
  return res.status(200).json({ products });
});
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const product = await service.update(id, name, quantity);
    res.status(200).json(product);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err: { code: err.code, message: err.message } });
    }
    console.error(err);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await service.getById(id);
    res.status(200).json(product);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err: { code: err.code, message: err.message } });
    }
    console.error(err);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});
module.exports = router;
