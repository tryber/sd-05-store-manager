const { Router } = require('express');

const salesRouter = Router();

const salesService = require('../services/salesService');

// const salesModel = require('../models/salesModel');

// 5 - Crie um endpoint para cadastrar vendas
salesRouter.post('/', async (req, res) => {
  const salesList = req.body; // dessa vez, é um array de objetos
  try {
    const saleCreated = await salesService.create(salesList);
    if (!saleCreated) return res.status(400).json({ message: 'Venda não foi criada' });
    return res.status(201).json(saleCreated);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err });
    }
    res.status(500).json({ message: 'Erro interno aiaiai' });
  }
});

// 6 - Crie um endpoint para listar as vendas
// salesRouter.get('/', async (req, res) => {
//   try {
//     const products = await prodModel.getAll();
//     res.status(200).json({ products }); // formato pedido no req
//   } catch (err) {
//     // sem cenário de invalid_data neste caso
//     res.status(500).json({ message: 'Erro interno aiaiai' });
//   }
// });

// salesRouter.get('/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     const prodById = await prodService.getById(id);
//     res.status(200).json(prodById);
//   } catch (err) {
//     if (err.code === 'invalid_data') {
//       return res.status(422).json({ err });
//     }
//     console.error(err);
//     res.status(500).json({ message: 'Erro interno aiaiai' });
//   }
// });

// 7 - Crie um endpoint para atualizar uma venda
// salesRouter.put('/:id', async (req, res) => {
  // const { id } = req.params;
  // const { name, quantity } = req.body;
  // try {
  //   const updatedProd = await prodService.updateById(id, name, quantity);
  //   res.status(200).json(updatedProd);
  // } catch (err) {
  //   if (err.code === 'invalid_data') {
  //     return res.status(422).json({ err });
  //   }
  //   console.error(err);
  //   res.status(500).json({ message: 'Erro interno aiaiai' });
  // }
// });

// 8 - Crie um endpoint para deletar uma venda
// salesRouter.delete('/:id', async (req, res) => {
  // const { id } = req.params;
  // try {
  //   const deletedProduct = await prodService.deleteById(id);
  //   return res.status(200).json(deletedProduct);
  // } catch (err) {
  //   if (err.code === 'invalid_data') {
  //     return res.status(422).json({ err });
  //   }
  //   console.error(err);
  //   res.status(500).json({ message: 'Erro interno aiaiai' });
  // }
// });

module.exports = salesRouter;
