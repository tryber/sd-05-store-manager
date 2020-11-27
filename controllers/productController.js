// const boom = require('boom');
// const rescue = require('express-rescue');
const service = require('../services/productService');
// const model = require('../models/productsModel');

const getAll = async (req, res) => { // rescue(
  try {
    const products = await service.getAll();

    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Algo deu ruim no getAll' });
  }
}; // )

const getById = async (req, res) => { // rescue(
  try {
    const { id } = req.params;

    const product = await service.getById(id);

    res.status(200).json(product);
  } catch (err) {
    console.log(err);
    res.status(422).json(err)
  }
}; // )

const create = async (req, res) => { // rescue(
  try {
    const { name, quantity } = req.body;

    const createdProduct = await service.create({ name, quantity });

    res.status(201).json(createdProduct);
  } catch (err) { //achei que íam ter códigos diferentes, dá para deixar tudo com 1 if...
    if (err.message === 'already_exists') {
      return res.status(422).json(err)
    }
    if (err.message === '"name" should exist') {
      return res.status(422).json(err);
    }
    if (err.message === '"name" must be at least 5 characters long') {
      return res.status(422).json(err);
    }
    if (err.message === '"quantity" must be a number') {
      return res.status(422).json(err);
    }
    if (err.message === '"quantity" must be larger than or equal to 1') {
      return res.status(422).json(err);
    }
    console.error(err);
    res.status(500).json({ message: 'Algo deu ruim no create' });
  };
}; // )

// update validate?
// const update = rescue(async (req, res) => {
//   const { id } = req.params;
//   const { name, quantity } = req.body;

//   await model.update({ id, name, quantity });

//   res.status(204).end();
// });

// const remove = rescue(async (req, res) => {
//   const { id } = req.params;

//   await model.exclude(id);

//   res.status(204).end();
// });

module.exports = {
  getAll,
  getById,
  create,
//  update,
//  remove,
};
