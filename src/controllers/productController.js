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
module.exports = router;
