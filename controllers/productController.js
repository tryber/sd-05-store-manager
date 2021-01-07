const { Router } = require('express');

// Router é agrupador de middlewares
const prodRouter = Router();

const productService = require('../services/productService');

/*  ********************************************************************************************* */
// 1 - Crie um endpoint para o cadastro de produtos
// POST /product/ -> Comportamento de create
prodRouter.post('/', async (req, res) => {
  const { name, quantity } = req.body;
  try {
    const produtoCriado = await productService.create(name, quantity);
    if (!produtoCriado) return res.status(400).json({ message: 'Produto não foi criado' });
    return res.status(201).json(produtoCriado);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err });
    }
    console.error(err);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

/*  ********************************************************************************************* */
// 2 - Crie um endpoint para listar os produtos
// GET /product/ -> Comportamento de getAll
// O endpoint deve ser acessível através do caminho (/products) ou (/products/:id);
prodRouter.get('/', async (req, res) => {
  const produtos = await productService.getAll();

  res.status(200).json(produtos);
});

prodRouter.get('/', async (req, res) => {
  try {
    const produtos = await productService.getAll();
    // com status http 200
    res.status(200).json({ produtos });
  } catch (err) {
    // sem cenário de invalid_data neste caso
    res.status(500).json({ message: 'Internal error' });
  }
});

// Rotas que tem parametros devem vir depois de rotas que nao
// tem parametreos.
// GET /product/:id -> Comportamento de getById
prodRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const person = await productService.getById(id);

    // com status http 200
    res.status(200).json(person);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err });
    }

    console.error(err);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

/*  ********************************************************************************************* */

module.exports = prodRouter;
