const { Router } = require('express');

const salesRouter = Router();

const salesService = require('../services/salesService');

/*  ********************************************************************************************* */
// 5 - Crie um endpoint para cadastrar vendas
salesRouter.post('/', async (req, res) => {
  try {
    const { body } = req;
    const novo = await salesService.create(body);
    res.status(200).json(novo);
  } catch (errou) {
    console.log('erro controller', errou);
    if (errou.err.code === 'invalid_data') {
      return res.status(422).json(errou);
    }
    console.error(errou);
    res.status(500).json({ message: 'Deu ruim no POST' });
  }
});

/*  ********************************************************************************************* */
// 6 - Crie um endpoint para listar as vendas
// O endpoint deve ser acessível através do caminho (/sales) ou (/sales/:id);
// Através do caminho /sales, todas as vendas devem ser retornadas;
// Através do caminho /sales/:id, apenas a venda com o id presente na URL deve ser retornada;
salesRouter.get('/', async (req, res) => {
  const sales = await salesService.getAll();
  res.status(200).json({ sales });
});

// 6.2 - Rotas que tem parametros devem vir depois de rotas que nao
// tem parametreos.
// GET /sales/:id -> Comportamento de getSalesById
salesRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await salesService.getById(id);
    res.status(200).json(sale);
  } catch (errou) {
    if (errou.err.code === 'not_found') {
      return res.status(404).json(errou);
    }
    res.status(500).json({ message: 'Deu ruim' });
  }
});

module.exports = salesRouter;
