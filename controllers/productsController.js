const express = require('express');

const router = express.Router();

const service = require('../services/productsService');

router.post('/', async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const product = await service.create(name, quantity);
    return res.status(201).json(product);
  } catch (error) {
    if (error.err.code === 'invalid_data') {
      return res.status(422).json(error);
    }
    console.error(error);
    return res.status(500).json({ message: error });
  }
});

module.exports = router;
