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
  } catch (error) {
    console.log('erro controller', error);
    if (error.err.code === 'invalid_data') {
      return res.status(422).json(error);
    }
    console.error(error);
    res.status(500).json({ message: 'Internal Error' });
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
  } catch (error) {
    console.log('erro controller', error);
    if (error.err.code === 'not_found') {
      return res.status(404).json(error);
    }
    res.status(500).json({ message: 'Internal Error' });
  }
});

// 7 - Crie um endpoint para atualizar uma venda
// O endpoint deve ser acessível através do caminho (/sales/:id);

// O corpo da requisição deve receber a seguinte estrutura:
// [
//   {
//     "productId": "5f3ff849d94d4a17da707008",
//     "quantity": 3
//   }
// ]
salesRouter.put('/:id', async (req, res) => {
  try {
    const { body } = req;
    const { id } = req.params;
    const saleUpdated = await salesService.update(id, body);
    res.status(200).json(saleUpdated);
  } catch (error) {
    console.log('erro controller', error);
    if (error.err.code === 'invalid_data') {
      return res.status(422).json(error);
    }
    res.status(500).json({ message: 'Internal Error' });
  }
});

// 8 - Crie um endpoint para deletar uma venda
// O endpoint deve ser acessível através do caminho (/sales/:id);

// Apenas a venda com o id presente na URL deve ser deletado;
salesRouter.delete('/:id', async (req, res) => {
  try {
    const excluded = await salesService.exclude(req.params.id);
    res.status(200).json(excluded);
  } catch (error) {
    if (error.err.code === 'invalid_data') {
      return res.status(422).json(error);
    }
    res.status(500).json({ message: 'Internal Error' });
  }
});

module.exports = salesRouter;
