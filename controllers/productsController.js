const { Router } = require('express');

const router = Router();

// const rescue = require('express-rescue');

const prodService = require('../services/productsService');

// O Controller gera os req e res.
// Chama as funções do service que fazem a ponte até o model e o BD.

// 1 - Crie um endpoint para o cadastro de produtos
router.post('/', async (req, res) => {
  const { name, quantity } = req.body;
  try {
    const productCreated = await prodService.create(name, quantity);
    if (!productCreated) return res.status(400).json({ message: 'Produto não foi criado' });
    return res.status(201).json(productCreated);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err });
    }
    console.error(err);
    res.status(500).json({ message: 'Erro interno aiaiai' });
  }
});

module.exports = router;
