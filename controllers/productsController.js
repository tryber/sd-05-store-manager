const { Router } = require('express');

const router = Router();

// const rescue = require('express-rescue');

const prodService = require('../services/productsService');
// O Controller gera os req e res.
// Chama as funções do service que fazem a ponte até o model e o BD.

const prodModel = require('../models/productsModel');

// Controller pode chamar diretamente model tb, pulando service.

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

// 2 - Crie um endpoint para listar os produtos
router.get('/', async (req, res) => {
  try {
    const products = await prodModel.getAll();
    res.status(200).json({ products }); // formato pedido no req
  } catch (err) {
    // sem cenário de invalid_data neste caso
    res.status(500).json({ message: 'Erro interno aiaiai' });
  }
});

// Escritura com o rescue seria:
// router.get('/', rescue (async (req, res) => {
//   const products = await prodModel.getAll();
//   res.status(200).json({ products });
// }));
// Nao escolhida por conta de nao retornar mensagem 500.

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const prodById = await prodService.getById(id);
    res.status(200).json(prodById);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err });
    }
    console.error(err);
    res.status(500).json({ message: 'Erro interno aiaiai' });
  }
});

// 3 - Crie um endpoint para atualizar um produto
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  try {
    const updatedProd = await prodService.updateById(id, name, quantity);
    res.status(200).json(updatedProd);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err });
    }
    console.error(err);
    res.status(500).json({ message: 'Erro interno aiaiai' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await prodService.deleteById(id);
    return res.status(200).json(deletedProduct);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err });
    }
    console.error(err);
    res.status(500).json({ message: 'Erro interno aiaiai' });
  }
});

module.exports = router;
