const { Router } = require('express');
const service = require('../services/productsService');

const products = Router();

products.post('/', async (req, res) => {
  try {
    const { name, quantity } = req.body;

    const newProdutct = await service.create(name, quantity);
  
    res.status(201).json(newProdutct);
  } catch (err) {
    // aqui falta colocar o tratamento de erro conforme o service.
    console.error(err);

    res.status(500).json({ message: 'Algo deu errado '});
  }
})

module.exports = products;
