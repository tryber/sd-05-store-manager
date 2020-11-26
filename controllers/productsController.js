const { Router } = require('express');
const router = Router();

const prodService = require('../services/productsService');
// O Controller gera os req e res, chamando as funções do service que fazem a ponte até o model e o BD.

// 1 - Crie um endpoint para o cadastro de produtos
router.post('/', async (req, res) => {
  const { name, quantity } = req.body;
  const productCreated = await prodService.create(name, quantity);
  if (!productCreated) return res.status(400).json({ message: 'ruim'});
  return res.status(201).json(productCreated);
});

module.exports = router;
