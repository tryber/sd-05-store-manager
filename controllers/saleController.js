const express = require('express');
const rescue = require('express-rescue');
const salesModel = require('../models/salesModel');

const router = express.Router();

const salesValidate = require('../middlewares/salesValidate');
const { deleteSale } = require('../models/salesModel');
const { erroMsg } = require('../middlewares/erroResponse');

// Controler chamando diretamente a model sem intermédio do services

// 1 - Crie um endpoint para cadastrar venda

router.post(
  '/',
  salesValidate.saleValidaQtd,
  rescue(async (req, res) => {
    const sale = req.body;
    const newsale = await salesModel.createSale(sale);
    res.status(201).json(newsale);
  }),
);

// 2 - Listar todas as vendas
router.get(
  '/',
  rescue(async (_req, res) => {
    const sales = await salesModel.findAllSale();
    res.status(200).json({ sales });
  }),
);

router.get(
  '/:id',
  salesValidate.idExists, rescue(async (req, res) => {
    const { sale } = req;

    res.status(200).json(sale);
  }),
);

// 3 - Atualizar vendas pelo id
router.put(
  '/:id',
  salesValidate.saleValidaQtd,
  rescue(async (req, res) => {
    const { id } = req.params;
    const soldSale = await salesModel.findByIdSale(id);

    if (!soldSale) {
      return res.status(422).json(erroMsg('invalid_data', 'Wrong id format'));
    }

    const saleBody = req.body;
    await salesModel.saleUpdate(id, saleBody);

    const sale = await salesModel.findByIdSale(id);

    res.status(200).json(sale);
  }),
);

// 4 - Deletar uma venda por id

router.delete(
  '/:id',
  rescue(async (req, res) => {
    const { id } = req.params;

    const excludeSale = await salesModel.findByIdSale(id);

    if (!excludeSale) {
      res.status(422).json(erroMsg('invalid_data', 'Wrong sale ID format'));
    }

    await salesModel.deleteSale(id);

    res.status(200).json(deleteSale);
  }),
);

module.exports = router;
