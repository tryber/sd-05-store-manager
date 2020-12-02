const { Router } = require('express');
const salesService = require('../services/salesService');

const service = require('../services/salesService');

const router = Router();

router.post('/', async (req, res) => {
  try {
    const newSale = await service.create(req.body);
    return res.status(200).json(newSale);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err: { code: err.code, message: err.message } });
    }
    console.error(err);
    return res.status(500).json({ message: 'Algo deu errado' });
  }
});

router.get('/', async (_req, res) => {
  const products = await service.getAll();
  return res.status(200).json({ sales: products });
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await service.getById(id);
    res.status(200).json(product);
  } catch (err) {
    console.log(err);
    if (err.code === 'not_found') {
      return res.status(404).json({ err: { code: err.code, message: err.message } });
    }
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { productId, quantity } = req.body[0];
  try {
    const updateSale = await salesService.update(id, productId, quantity);
    return res.status(200).json(updateSale);
  } catch (err) {
    console.log(err);
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err: { code: err.code, message: err.message } });
    }
  }
});

module.exports = router;
