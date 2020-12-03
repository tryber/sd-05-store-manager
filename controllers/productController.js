const express = require('express');
const rescue = require('express-rescue');
const { Router } = require('express');
const productsValidate = require('../middlewares/productsValidate');

const router = Router();

const prodValidate = require('../middlewares/productsValidate');

const productsModel = require('../models/productsModel');

// Controler chamando diretamente a model sem intermédio do services

// 1 - Crie um endpoint para cadastro de produtos

router.post(
  '/',
  productsValidate.validaName,
  prodValidate.validaQtd,
  rescue(async (req, res) => {
    const { name, quantity } = req.body;
    const product = await productsModel.addProduct(name, quantity);
    res.status(201).json(product);
  }),
);

// 2 - Listar todos produtos e por id
router.get(
  '/',
  rescue(async (_req, res) => {
    const products = await productsModel.findAll();
    res.status(200).json({ products });
  }),
);

router.get(
  '/:id',
  productsValidate.
)

module.exports = router;
